// testgit/src/utils/fetchSeoulApi.ts
//import fetch from "node-fetch";

/** 간단한 지수 백오프 재시도 유틸 */
async function retry<T>(fn: () => Promise<T>, tries = 3, baseMs = 400): Promise<T> {
  let lastErr: any;
  for (let i = 0; i < tries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (i === tries - 1) break; // 마지막 시도면 종료
      const delay = baseMs * Math.pow(2, i); // 0.4s → 0.8s → 1.6s ...
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw lastErr;
}

export async function fetchSeoulApi<T>(
  endpoint: string,
  rootKey: string,
  yearCode?: string,
  options?: {
    step?: number;        // 요청당 최대 건수 (기본 1000)
    maxPages?: number;    // 안전장치: 최대 페이지 수
    extraParams?: string; // 추가 쿼리스트링 (예: "&GU_CD=...") — 앞에 & 포함
    delayMs?: number;     // 페이지 사이 딜레이 (기본 200ms)
  }
): Promise<T[]> {
  const result: T[] = [];
  const step = options?.step ?? 1000;
  const maxPages = options?.maxPages ?? 10;
  const extraParams = options?.extraParams ?? "";
  const delayMs = options?.delayMs ?? 0;

  const base = "http://openapi.seoul.go.kr:8088";
  const rawKey = process.env.AUTHENTICATION_KEY ?? "";
  const key = encodeURIComponent(rawKey);

  if (!rawKey) {
    throw new Error("환경변수 AUTHENTICATION_KEY가 비어 있습니다. .env 설정을 확인하세요.");
  }

  // 일부 엔드포인트는 세그먼트에 이미 json이 포함되지만,
  // 비정상/제한 응답 시 XML을 줄 수 있어 resultType=json을 함께 강제 시도
  const JSON_PARAM = "&resultType=json";

  let startIndex = 1;
  let endIndex = step;

  for (let page = 1; page <= maxPages; page++) {
    // yearCode가 필요한 API만 yearPart를 추가
    const yearPart = yearCode ? `/${encodeURIComponent(yearCode)}` : "";
    // 캐시 회피용 파라미터(_)와 JSON_PARAM/extraParams 추가
    const url =
      `${base}/${key}/json/${endpoint}/${startIndex}/${endIndex}` +
      `${yearPart}?_=${Date.now()}${JSON_PARAM}${extraParams}`;
    
    const data = await retry(async () => {
      const res = await fetch(url, {
        headers: { Accept: "application/json,*/*" },
      });
    
      // HTTP 상태 확인
      if (!res.ok) {
        const txt = await res.text();
        const code = txt.match(/<CODE>([^<]+)<\/CODE>/i)?.[1] ?? String(res.status);
        const msg  = txt.match(/<MESSAGE>([^<]+)<\/MESSAGE>/i)?.[1] ?? "HTTP error";
        throw new Error(`HTTP ${res.status} / CODE=${code} / MSG=${msg}`);
      }

      const ct = res.headers.get("content-type") || "";

      // JSON 우선
      if (ct.includes("application/json")) {
        // 여기서 Record<string, any>로 캐스팅 → 문자열 인덱싱 허용
        return (await res.json()) as Record<string, any>;
      }
    
      // 그 외(대개 XML) → 텍스트로 읽고 의미있는 에러로 변환
      const txt = await res.text();
      const code = txt.match(/<CODE>([^<]+)<\/CODE>/i)?.[1] ?? "UNKNOWN";
      const msg  = txt.match(/<MESSAGE>([^<]+)<\/MESSAGE>/i)?.[1] ?? "Non-JSON response";
      throw new Error(`Non-JSON response. CODE=${code} MSG=${msg}`);
    });
  
    // === API 표준 응답 구조 점검 ===
    const payload = data?.[rootKey] as Record<string, any> | undefined;

    // RESULT.CODE로 정상/종료 판단
    const resultCode: string | undefined = payload?.RESULT?.CODE;
    if (resultCode === "INFO-200") {
      console.log("데이터 없음 → 반복 종료");
      break;
    }
    if (resultCode && resultCode !== "INFO-000") {
      const msg = payload?.RESULT?.MESSAGE ?? "Unknown";
      console.warn(`서버 RESULT.CODE=${resultCode}, MESSAGE=${msg} → 반복 종료`);
      break;
    }
    
    const rows = (payload?.row ?? []) as T[];
    if (!Array.isArray(rows) || rows.length === 0) {
      console.log("행(row) 없음 → 반복 종료");
      break;
    }

    result.push(...rows);

    // 다음 페이지로
    startIndex += step;
    endIndex += step;

    // 과도한 요청 방지
    if (delayMs > 0) {
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }

  return result;
}
// testgit/src/utils/fetchSeoulApi.ts
import fetch from "node-fetch";

/** 간단한 지수 백오프 재시도 유틸 */
async function retry<T>(fn: () => Promise<T>, tries = 3, baseMs = 400): Promise<T> {
  let lastErr: any;
  for (let i = 0; i < tries; i++) {
    try { return await fn(); }
    catch (err) {
      lastErr = err;
      if (i === tries - 1) break;
      await new Promise(r => setTimeout(r, baseMs * Math.pow(2, i)));
    }
  }
  throw lastErr;
}

type Params = Record<string, string | number | undefined>;

function buildQuery(params: Params): string {
  const q = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join("&");
  return q ? `?${q}` : "";
}

export async function fetchSeoulApi<T>(
  endpoint: string,
  rootKey: string,
  yearCode?: string, // deprecated: STDR_YYQU_CD로 자동 매핑
  options?: {
    step?: number;        // 요청당 최대 건수 (기본 1000)
    maxPages?: number;    // (선택) 여전히 사용 가능하지만 기본값은 무제한
    params?: Params;      // 쿼리 파라미터
    extraParams?: string; // (레거시) "&GU_CD=..." 문자열
    delayMs?: number;     // 페이지 사이 딜레이 (기본 200ms)
    hardCap?: number;     // (선택) 안전 장치로 전체 최대 수량을 하드캡
  }
): Promise<T[]> {
  const result: T[] = [];
  const step      = options?.step ?? 1000;
  const delayMs   = options?.delayMs ?? 200;
  const hardCap   = options?.hardCap; // 무제한이지만 원하면 안전장치로 사용
  const maxPages  = options?.maxPages ?? Number.POSITIVE_INFINITY; // ← 무제한 기본값

  const base      = "http://openapi.seoul.go.kr:8088";
  const rawKey    = process.env.AUTHENTICATION_KEY ?? "";
  const key       = encodeURIComponent(rawKey);

  if (!rawKey) {
    throw new Error("환경변수 AUTHENTICATION_KEY가 비어 있습니다. .env 설정을 확인하세요.");
  }

  let startIndex = 1;
  let endIndex   = step;
  let totalCount: number | undefined;

  for (let page = 1; page <= maxPages; page++) {
    const mergedParams: Params = {
      _: Date.now(),
      resultType: "json",
      STDR_YYQU_CD: yearCode ?? undefined,   // yearCode → 쿼리 파라미터로 매핑
      ...(options?.params ?? {}),
    };

    const qs =
      buildQuery(mergedParams) +
      (options?.extraParams
        ? (buildQuery(mergedParams) ? "&" : "?") +
          options.extraParams.replace(/^\?/, "").replace(/^&/, "")
        : "");

    const url = `${base}/${key}/json/${encodeURIComponent(endpoint)}/${startIndex}/${endIndex}${qs}`;

    const data = await retry(async () => {
      const res = await fetch(url, { headers: { Accept: "application/json,*/*" } });

      if (!res.ok) {
        const txt  = await res.text();
        const code = txt.match(/<CODE>([^<]+)<\/CODE>/i)?.[1] ?? String(res.status);
        const msg  = txt.match(/<MESSAGE>([^<]+)<\/MESSAGE>/i)?.[1] ?? "HTTP error";
        throw new Error(`HTTP ${res.status} / CODE=${code} / MSG=${msg} / endpoint=${endpoint} page=${page} range=${startIndex}-${endIndex}`);
      }

      const ct = res.headers.get("content-type") || "";
      if (ct.includes("application/json")) {
        return (await res.json()) as Record<string, any>;
      }

      const txt = await res.text();
      const code = txt.match(/<CODE>([^<]+)<\/CODE>/i)?.[1] ?? "UNKNOWN";
      const msg  = txt.match(/<MESSAGE>([^<]+)<\/MESSAGE>/i)?.[1] ?? "Non-JSON response";
      throw new Error(`Non-JSON response. CODE=${code} MSG=${msg} / endpoint=${endpoint} page=${page} range=${startIndex}-${endIndex}`);
    });

    const payload = data?.[rootKey] as Record<string, any> | undefined;

    const resultCode: string | undefined = payload?.RESULT?.CODE;
    if (resultCode === "INFO-200") break;               // 데이터 없음
    if (resultCode && resultCode !== "INFO-000") {
      const msg = payload?.RESULT?.MESSAGE ?? "Unknown";
      console.warn(`RESULT.CODE=${resultCode} MESSAGE=${msg} endpoint=${endpoint} page=${page}`);
      break;
    }

    if (typeof payload?.list_total_count === "number") {
      totalCount = payload.list_total_count;
    }

    const rows = (payload?.row ?? []) as T[];
    if (!Array.isArray(rows) || rows.length === 0) break;

    result.push(...rows);

    // (선택) 하드캡 도달 시 종료
    if (typeof hardCap === "number" && result.length >= hardCap) {
      result.length = hardCap; // 초과분 잘라내기
      break;
    }

    // 총 개수 도달 시 종료
    if (typeof totalCount === "number" && result.length >= totalCount) break;

    // 다음 페이지
    startIndex += step;
    endIndex   += step;

    if (delayMs > 0) await new Promise(r => setTimeout(r, delayMs));
  }

  return result;
}
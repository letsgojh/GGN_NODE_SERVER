import fetch from "node-fetch"; //npm install node-fetch 해야함

export async function fetchSeoulApi<T>(
  endpoint: string,
  rootKey: string,
  yearCode?: string
): Promise<T[]> {
  const result: T[] = [];
  let startIndex = 1;
  let endIndex = 1000;

  while (true) {
    const url = `http://openapi.seoul.go.kr:8088/${process.env.AUTHENTICATION_KEY}/json/${endpoint}/${startIndex}/${endIndex}/${yearCode ?? ""}`;
    let res: any;

    try {
      const response = await fetch(url);
      res = await response.json();
    } catch (error) {
      console.error(` ${startIndex} ~ ${endIndex} 요청 실패:`, error);
      break;
    }

    if (
      !res ||
      !res[rootKey] ||
      (res[rootKey].RESULT && res[rootKey].RESULT.CODE === "INFO-200")
    ) {
      console.log("데이터 없음 → 반복 종료");
      break;
    }

    result.push(...res[rootKey].row);
    startIndex += 1000;
    endIndex += 1000;
  }

  return result;
}
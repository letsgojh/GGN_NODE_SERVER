//pnpm add -D @types/node
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fetchSeoulApi } from "../utils/fetchSeoulApi.ts";
import {
  getSeoulFloatingPopulationParam,
    getSeoulMarketCount_Param,
    getSeoulCompanyPopulation_Param,
    getSeoulEstimateIncome_Param,
    getSeoulStorePrice_Param
} from "../service/convenient_store/types.ts"

const __dirnameSafe = typeof __dirname !== "undefined"
  ? __dirname
  : path.dirname(new URL(import.meta.url).pathname);
const ENV_PATH = path.resolve(__dirnameSafe, "../../../../server/.env");
dotenv.config({ path: ENV_PATH, override: true });

// 디버그 출력
console.log("[dotenv] path =", ENV_PATH, "exists?", fs.existsSync(ENV_PATH));
console.log("[dotenv] AUTHENTICATION_KEY =", process.env.AUTHENTICATION_KEY);

// ---------------------------------------------
// 1. 유동인구 (상권)
// ---------------------------------------------
export async function getSeoulFloatingPopulation(): Promise<getSeoulFloatingPopulationParam[]> {
  const data = await fetchSeoulApi<getSeoulFloatingPopulationParam>(
    "VwsmTrdarFlpopQq",
    "VwsmTrdarFlpopQq",
    "20241"
  );
  console.log("서울시 유동인구 (상권):", data.length);
  return data;
}

// ---------------------------------------------
// 2. 직장인구 (상권)
// ---------------------------------------------
export async function getSeoulCompanyPopulation_commercial(): Promise<getSeoulCompanyPopulation_Param[]> {
  const data = await fetchSeoulApi<getSeoulCompanyPopulation_Param>(
    "VwsmTrdarWrcPopltnQq",
    "VwsmTrdarWrcPopltnQq"
  );
  console.log("서울시 직장인구 (상권):", data.length);
  return data;
}

// ---------------------------------------------
// 3. 직장인구 (상권배후지)
// ---------------------------------------------
export async function getSeoulCompanyPopulation_hinterland(): Promise<getSeoulCompanyPopulation_Param[]> {
  const data = await fetchSeoulApi<getSeoulCompanyPopulation_Param>(
    "Vwsm_TrdhlWrcPopltnQq",
    "Vwsm_TrdhlWrcPopltnQq"
  );
  console.log("서울시 직장인구 (상권배후지):", data.length);
  return data;
}

// ---------------------------------------------
// 4. 점포 수 (상권)
// ---------------------------------------------
export async function getSeoulMarketCount_commercial(): Promise<getSeoulMarketCount_Param[]> {
  const data = await fetchSeoulApi<getSeoulMarketCount_Param>(
    "VwsmTrdarStorQq",
    "VwsmTrdarStorQq",
    "20241"
  );
  console.log("서울시 점포 수 (상권):", data.length);
  return data;
}

// ---------------------------------------------
// 5. 점포 수 (상권배후지)
// ---------------------------------------------
export async function getSeoulMarketCount_hinterland(): Promise<getSeoulMarketCount_Param[]> {
  const data = await fetchSeoulApi<getSeoulMarketCount_Param>(
    "VwsmTrdhlStorQq",
    "VwsmTrdhlStorQq"
  );
  console.log("서울시 점포 수 (상권배후지):", data.length);
  return data;
}

// ---------------------------------------------
// 6. 추정 매출 (상권)
// ---------------------------------------------
export async function getSeoulEstimateIncome_commercial(): Promise<getSeoulEstimateIncome_Param[]> {
  const data = await fetchSeoulApi<getSeoulEstimateIncome_Param>(
    "VwsmTrdarSelngQq",
    "VwsmTrdarSelngQq"
  );
  console.log("서울시 추정 매출 (상권):", data.length);
  return data;
}

// ---------------------------------------------
// 7. 추정 매출 (상권배후지)
// ---------------------------------------------
export async function getSeoulEstimateIncome_hinterland(): Promise<getSeoulEstimateIncome_Param[]> {
  const data = await fetchSeoulApi<getSeoulEstimateIncome_Param>(
    "VwsmTrdhlSelngQq",
    "VwsmTrdhlSelngQq"
  );
  console.log("서울시 추정 매출 (상권배후지):", data.length);
  return data;
}


// ---------------------------------------------
// 8. 서울시 부동산 전월세가 정보
// ---------------------------------------------

export async function getSeoulStorePrice(): Promise<getSeoulStorePrice_Param[]> {
  const data = await fetchSeoulApi<getSeoulStorePrice_Param>(
    "tbLnOpendataRentV",
    "tbLnOpendataRentV"
  );
  console.log("서울시 추정 매출 (상권배후지):", data.length);
  return data;
}

// ---------------------------------------------
// 9. 서울시 영역(상권) 이건 재환이가 했음
// ---------------------------------------------


// ---------------------------------------------
// 테스트 실행용
// ---------------------------------------------
async function main() {
  console.log("📦 테스트 실행 시작...");
  await getSeoulFloatingPopulation();
  await getSeoulCompanyPopulation_commercial();
  await getSeoulCompanyPopulation_hinterland();
  await getSeoulMarketCount_commercial();
  await getSeoulMarketCount_hinterland();
  await getSeoulEstimateIncome_commercial();
  await getSeoulEstimateIncome_hinterland();
  await getSeoulStorePrice();
}
main();
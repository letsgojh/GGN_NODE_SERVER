//pnpm add -D @types/node
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fetchSeoulApi } from "../utils/fetchSeoulApi.ts";
import {
  getSeoulFloatingPopulation_Param,
  getSeoulCompanyPopulation_Param,
  getResidentPopulation_Param,

  getSeoulMarketCount_Param,
  getSeoulEstimateIncome_Param,
  getSeoulStorePrice_Param,

  getSeoulCommercialDistrict_commercial_Param,
  getSeoulCommercialDistrict_hinterland_Param
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
export async function getSeoulFloatingPopulation_commercial(): Promise<getSeoulFloatingPopulation_Param[]> {
  const data = await fetchSeoulApi<getSeoulFloatingPopulation_Param>(
    "VwsmTrdarFlpopQq",
    "VwsmTrdarFlpopQq",
    "20241"
  );
  console.log("서울시 유동인구 (상권):", data.length);
  return data;
}

// ---------------------------------------------
// 2. 유동인구 (상권배후지)
// ---------------------------------------------

export async function getSeoulFloatingPopulation_hinterland(): Promise<getSeoulFloatingPopulation_Param[]> {
  const data = await fetchSeoulApi<getSeoulFloatingPopulation_Param>(
    "VwsmTrdhlFlpopQq",
    "VwsmTrdhlFlpopQq",
    "20241"
  );
  console.log("서울시 유동인구 (상권배후지):", data.length);
  return data;
}

// ---------------------------------------------
// 3. 직장인구 (상권)
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
// 4. 직장인구 (상권배후지)
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
// 5. 상주인구 (상권)
// ---------------------------------------------
export async function getResidentPopulation_commercial(): Promise<getResidentPopulation_Param[]> {
  const data = await fetchSeoulApi<getResidentPopulation_Param>(
    "VwsmTrdarRepopQq",
    "VwsmTrdarRepopQq"
  );
  console.log("서울시 상주인구 (상권):", data.length);
  return data;
}

// ---------------------------------------------
// 6. 상주인구 (상권배후지)
// ---------------------------------------------
export async function getResidentPopulation_hinterland(): Promise<getResidentPopulation_Param[]> {
  const data = await fetchSeoulApi<getResidentPopulation_Param>(
    "VwsmTrdhlRepopQq",
    "VwsmTrdhlRepopQq"
  );
  console.log("서울시 상주인구 (상권):", data.length);
  return data;
}

// ---------------------------------------------
// 7. 점포 수 (상권)
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
// 8. 점포 수 (상권배후지)
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
// 9. 추정 매출 (상권)
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
// 10. 추정 매출 (상권배후지)
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
// 11. 서울시 부동산 전월세가 정보 (암대료)
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
// 12. 서울시 영역(상권) 
// ---------------------------------------------

export async function getSeoulCommercialDistrict_commercial(): Promise<getSeoulCommercialDistrict_commercial_Param[]> {
  const data = await fetchSeoulApi<getSeoulCommercialDistrict_commercial_Param>(
    "TbgisTrdarRelm",
    "TbgisTrdarRelm"
  );
  console.log("서울시 영역 (상권):", data.length);
  return data;
}

// ---------------------------------------------
// 13. 서울시 영역(상권) 
// ---------------------------------------------

export async function getSeoulCommercialDistrict_hinterland(): Promise<getSeoulCommercialDistrict_hinterland_Param[]> {
  const data = await fetchSeoulApi<getSeoulCommercialDistrict_hinterland_Param>(
    "TbgisTrdhlRelmW",
    "TbgisTrdhlRelmW"
  );
  console.log("서울시 영역 (상권배후지):", data.length);
  return data;
}

// ---------------------------------------------
// 테스트 실행용
// ---------------------------------------------
async function main() {
  console.log("📦 테스트 실행 시작...");
  await getSeoulFloatingPopulation_commercial();
  await getSeoulFloatingPopulation_hinterland();

  await getSeoulCompanyPopulation_commercial();
  await getSeoulCompanyPopulation_hinterland();

  await getResidentPopulation_commercial();
  await getResidentPopulation_hinterland();

  await getSeoulMarketCount_commercial();
  await getSeoulMarketCount_hinterland();

  await getSeoulEstimateIncome_commercial();
  await getSeoulEstimateIncome_hinterland();

  await getSeoulStorePrice();

  await getSeoulCommercialDistrict_commercial();
  await getSeoulCommercialDistrict_hinterland();
}
main();
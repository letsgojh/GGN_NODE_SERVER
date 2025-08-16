/**
 * 7, 8: 점포 정보 api 가져옴
 * 상권 구분 가능(ex 골목상권)
 * 상권명 (ex 화계중학교) 구분
 * 서비스 업중 구분 가능(ex 의약품)
 * 
 * 11: 임대료 정보 api 가져옴
 * 자치구, 법정동, 지번 기준 구분 가능
 * 전, 월세 구분 가능
 * 
 */



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
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirnameSafe = path.dirname(__filename);
/*
const __dirnameSafe = typeof __dirname !== "undefined"
  ? __dirname
  : path.dirname(new URL(import.meta.url).pathname);
*/

  // 후보 경로들(프로젝트 구조에 맞게 위에서부터 탐색)
const candidates = [
  path.resolve(__dirnameSafe, "../../.env"),              // 루트/.env (controllers 기준)
  path.resolve(__dirnameSafe, "../../../../server/.env"), // server/.env 구조를 쓴다면
  path.resolve(process.cwd(), ".env"),                    // 현재 작업 디렉토리/.env
];
const ENV_PATH = candidates.find(p => fs.existsSync(p));

if (ENV_PATH) dotenv.config({ path: ENV_PATH, override: true });
else dotenv.config();

// 디버그
console.log("[dotenv] path =", ENV_PATH, "exists?", !!ENV_PATH);
console.log("[dotenv] AUTHENTICATION_KEY =", process.env.AUTHENTICATION_KEY);

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
// 11. 서울시 부동산 전월세가 정보 (암대료)
// ---------------------------------------------

export async function getSeoulStorePrice(): Promise<getSeoulStorePrice_Param[]> {
  const data = await fetchSeoulApi<getSeoulStorePrice_Param>(
    "tbLnOpendataRentV",
    "tbLnOpendataRentV"
  );
  console.log("서울시 임대료:", data.length);
  return data;
}


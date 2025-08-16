/**
 * 인구수 api 가져옴
 * 상권구분 가능(ex 골목상권)
 * 상권명 (ex 화계중학교) 구분
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
  console.log("서울시 상주인구 (상권배후지):", data.length);
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
}
main();

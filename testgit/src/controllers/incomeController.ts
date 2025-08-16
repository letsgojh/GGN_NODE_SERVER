/**
 * 추정매출 정보 api 가져옴
 * 상권 구분 가능(ex 골목상권)
 * 상권명 (ex 화계중학교) 구분
 * 서비스 업중 구분 가능(ex 의약품)
 */



//pnpm add -D @types/node
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fetchSeoulApi } from "../utils/fetchSeoulApi.ts";
import {
  getSeoulEstimateIncome_Param,
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
/**
 * 영역(자치구, 행정동) 정보 api 가져옴
 * 상권구분 가능(ex 골목상권)
 * 상권명 (ex 화계중학교) 구분
 */



//pnpm add -D @types/node
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fetchSeoulApi } from "../utils/fetchSeoulApi.ts";
import {
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
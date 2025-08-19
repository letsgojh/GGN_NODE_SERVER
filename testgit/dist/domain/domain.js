//pnpm add -D @types/node
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fetchSeoulApi } from "../utils/fetchSeoulApi.js";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirnameSafe = path.dirname(__filename);
// 후보 경로들(프로젝트 구조에 맞게 위에서부터 탐색)
const candidates = [
    path.resolve(__dirnameSafe, "../../.env"), // 루트/.env (controllers 기준)
    path.resolve(__dirnameSafe, "../../../../server/.env"), // server/.env 구조를 쓴다면
    path.resolve(process.cwd(), ".env"), // 현재 작업 디렉토리/.env
];
const ENV_PATH = candidates.find(p => fs.existsSync(p));
dotenv.config(ENV_PATH ? { path: ENV_PATH, override: true } : {});
dotenv.config({ path: ENV_PATH, override: true });
// 디버그
console.log("[dotenv] path =", ENV_PATH, "exists?", !!ENV_PATH);
console.log("[dotenv] AUTHENTICATION_KEY =", process.env.AUTHENTICATION_KEY);
// ---------------------------------------------
// 1. 유동인구 (상권)
// ---------------------------------------------
export async function getSeoulFloatingPopulation_commercial() {
    const data = await fetchSeoulApi("VwsmTrdarFlpopQq", "VwsmTrdarFlpopQq", "20241");
    console.log("서울시 유동인구 (상권):", data.length);
    return data;
}
// ---------------------------------------------
// 2. 유동인구 (상권배후지)
// ---------------------------------------------
export async function getSeoulFloatingPopulation_hinterland() {
    const data = await fetchSeoulApi("VwsmTrdhlFlpopQq", "VwsmTrdhlFlpopQq", "20241");
    console.log("서울시 유동인구 (상권배후지):", data.length);
    return data;
}
// ---------------------------------------------
// 3. 직장인구 (상권)
// ---------------------------------------------
export async function getSeoulCompanyPopulation_commercial() {
    const data = await fetchSeoulApi("VwsmTrdarWrcPopltnQq", "VwsmTrdarWrcPopltnQq");
    console.log("서울시 직장인구 (상권):", data.length);
    return data;
}
// ---------------------------------------------
// 4. 직장인구 (상권배후지)
// ---------------------------------------------
export async function getSeoulCompanyPopulation_hinterland() {
    const data = await fetchSeoulApi("Vwsm_TrdhlWrcPopltnQq", "Vwsm_TrdhlWrcPopltnQq");
    console.log("서울시 직장인구 (상권배후지):", data.length);
    return data;
}
// ---------------------------------------------
// 5. 상주인구 (상권)
// ---------------------------------------------
export async function getResidentPopulation_commercial() {
    const data = await fetchSeoulApi("VwsmTrdarRepopQq", "VwsmTrdarRepopQq");
    console.log("서울시 상주인구 (상권):", data.length);
    return data;
}
// ---------------------------------------------
// 6. 상주인구 (상권배후지)
// ---------------------------------------------
export async function getResidentPopulation_hinterland() {
    const data = await fetchSeoulApi("VwsmTrdhlRepopQq", "VwsmTrdhlRepopQq");
    console.log("서울시 상주인구 (상권배후지):", data.length);
    return data;
}
// ---------------------------------------------
// 7. 점포 수 (상권)
// ---------------------------------------------
export async function getSeoulMarketCount_commercial() {
    const data = await fetchSeoulApi("VwsmTrdarStorQq", "VwsmTrdarStorQq", "20241");
    console.log("서울시 점포 수 (상권):", data.length);
    return data;
}
// ---------------------------------------------
// 8. 점포 수 (상권배후지)
// ---------------------------------------------
export async function getSeoulMarketCount_hinterland() {
    const data = await fetchSeoulApi("VwsmTrdhlStorQq", "VwsmTrdhlStorQq");
    console.log("서울시 점포 수 (상권배후지):", data.length);
    return data;
}
// ---------------------------------------------
// 9. 추정 매출 (상권)
// ---------------------------------------------
export async function getSeoulEstimateIncome_commercial() {
    const data = await fetchSeoulApi("VwsmTrdarSelngQq", "VwsmTrdarSelngQq");
    console.log("서울시 추정 매출 (상권):", data.length);
    return data;
}
// ---------------------------------------------
// 10. 추정 매출 (상권배후지)
// ---------------------------------------------
export async function getSeoulEstimateIncome_hinterland() {
    const data = await fetchSeoulApi("VwsmTrdhlSelngQq", "VwsmTrdhlSelngQq");
    console.log("서울시 추정 매출 (상권배후지):", data.length);
    return data;
}
// ---------------------------------------------
// 11. 서울시 부동산 전월세가 정보 (암대료)
// ---------------------------------------------
export async function getSeoulStorePrice() {
    const data = await fetchSeoulApi("tbLnOpendataRentV", "tbLnOpendataRentV", "2025");
    console.log("서울시 임대료 (자치구):", data.length);
    return data;
}
// ---------------------------------------------
// 12. 서울시 영역(상권) 
// ---------------------------------------------
export async function getSeoulCommercialDistrict_commercial() {
    const data = await fetchSeoulApi("TbgisTrdarRelm", "TbgisTrdarRelm");
    console.log("서울시 영역 (상권):", data.length);
    return data;
}
// ---------------------------------------------
// 13. 서울시 영역(상권배후지) 
// ---------------------------------------------
export async function getSeoulCommercialDistrict_hinterland() {
    const data = await fetchSeoulApi("TbgisTrdhlRelmW", "TbgisTrdhlRelmW");
    console.log("서울시 영역 (상권배후지):", data.length);
    return data;
}
// ---------------------------------------------
// 14. 서울시 추정매출(자치구) 
// ---------------------------------------------
export async function getSeoulEstimateIncome_district() {
    const data = await fetchSeoulApi("VwsmSignguSelngW", "VwsmSignguSelngW");
    console.log("서울시 추정매출 (자치구):", data.length);
    return data;
}
// ---------------------------------------------
// 테스트 실행용
// ---------------------------------------------
// async function main() {
//   console.log("📦 테스트 실행 시작...");
//   await getSeoulFloatingPopulation_commercial();
//   await getSeoulFloatingPopulation_hinterland();
//   await getSeoulCompanyPopulation_commercial();
//   await getSeoulCompanyPopulation_hinterland();
//   await getResidentPopulation_commercial();
//   await getResidentPopulation_hinterland();
//   await getSeoulMarketCount_commercial();
//   await getSeoulMarketCount_hinterland();
//   await getSeoulEstimateIncome_commercial();
//   await getSeoulEstimateIncome_hinterland();
//   await getSeoulStorePrice();
//   await getSeoulCommercialDistrict_commercial();
//   await getSeoulCommercialDistrict_hinterland();
// }
// main();

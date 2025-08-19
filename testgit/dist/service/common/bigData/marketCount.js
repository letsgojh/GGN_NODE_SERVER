import { categoryMap } from "../industry/category.js";
import { getSeoulMarketCount_commercial, getSeoulMarketCount_hinterland, } from '../../../domain/calledData.js';
// 소분류 → 대분류 역매핑
function buildReverseMap(catMap) {
    const reverse = new Map();
    for (const [top, subs] of Object.entries(catMap)) {
        for (const sub of subs)
            reverse.set(sub, top);
    }
    return reverse;
}
// 핵심 함수
export async function pushSummationMarketCount_commercial() {
    console.log("상권별 점포수 받아오는 중...");
    const raw = await getSeoulMarketCount_commercial();
    const subToTop = buildReverseMap(categoryMap);
    // districtName(상권) → (대분류 → 점포수)
    const acc = new Map();
    for (const r of raw) {
        const districtName = r.TRDAR_CD_NM; // 상권명
        const sub = r.SVC_INDUTY_CD_NM; // 소분류명
        const top = subToTop.get(sub) ?? "기타"; // 대분류 매핑 실패 시 "기타"
        const cnt = Number(r.STOR_CO ?? 1);
        // 상권 버킷
        let byTop = acc.get(districtName);
        if (!byTop) {
            byTop = new Map();
            acc.set(districtName, byTop);
        }
        // 대분류 누적
        byTop.set(top, (byTop.get(top) ?? 0) + cnt);
    }
    // Map → 배열 (districtName 중복 없음)
    const result = Array.from(acc.entries()).map(([districtName, list]) => ({
        districtName,
        list,
    }));
    return result;
}
export async function pushSummationMarketCount_hinterland() {
    console.log("상권별 점포수 받아오는 중...");
    const raw = await getSeoulMarketCount_hinterland();
    const subToTop = buildReverseMap(categoryMap);
    // districtName(상권) → (대분류 → 점포수)
    const acc = new Map();
    for (const r of raw) {
        const districtName = r.TRDAR_CD_NM; // 상권명
        const sub = r.SVC_INDUTY_CD_NM; // 소분류명
        const top = subToTop.get(sub) ?? "기타"; // 대분류 매핑 실패 시 "기타"
        const cnt = Number(r.STOR_CO ?? 1);
        // 상권 버킷
        let byTop = acc.get(districtName);
        if (!byTop) {
            byTop = new Map();
            acc.set(districtName, byTop);
        }
        // 대분류 누적
        byTop.set(top, (byTop.get(top) ?? 0) + cnt);
    }
    // Map → 배열 (districtName 중복 없음)
    const result = Array.from(acc.entries()).map(([districtName, list]) => ({
        districtName,
        list,
    }));
    return result;
}
//pushSummationmarketCount의 예시 출력
// [
//   {
//     "districtName": "강남역",
//     "list": { "외식음식 서비스": 128, "교육 서비스": 42, "의료 서비스": 19 }
//   },
//   {
//     "districtName": "홍대입구",
//     "list": { "외식음식 서비스": 95, "여가/오락 서비스": 27 }
//   }
// ]

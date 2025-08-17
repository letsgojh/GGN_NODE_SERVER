import { categoryMap } from "../industry/category.ts";
import {
    getSeoulFloatingPopulation_Param,
    getCompanyPopulation_Param,
    getResidentPopulation_Param,
    getSeoulMarketCount_Param,
    getSeoulEstimateIncome_Param,
    getSeoulStorePrice_Param,
    getSeoulCommercialDistrict_commercial_Param,
    getSeoulCommercialDistrict_hinterland_Param,
    getAverageFloatingPopulation_by_region,
    getTotalPopPerStore_Param,
    getPredictedIncomePerPop_Param
} from '../../../domain/types.ts'

import {
    getSeoulFloatingPopulation_commercial,
    getSeoulFloatingPopulation_hinterland,
    getSeoulCompanyPopulation_commercial,
    getSeoulCompanyPopulation_hinterland,
    getResidentPopulation_commercial,
    getResidentPopulation_hinterland,
    getSeoulMarketCount_commercial,
    getSeoulMarketCount_hinterland,
    getSeoulEstimateIncome_commercial,
    getSeoulEstimateIncome_hinterland,
    getSeoulStorePrice,
    getSeoulCommercialDistrict_commercial,
    getSeoulCommercialDistrict_hinterland,
} from '../../../domain/populationDomain.ts'

// === 최종 반환 형태 ===
type SummationRow = {
  districtName: string;               // 상권명
  list: Map<string, number>;          // 대분류 → 점포수 합계
};

// 소분류 → 대분류 역매핑
function buildReverseMap(catMap: Record<string, string[]>) {
  const reverse = new Map<string, string>();
  for (const [top, subs] of Object.entries(catMap)) {
    for (const sub of subs) reverse.set(sub, top);
  }
  return reverse;
}

// 핵심 함수
export async function pushSummationEstimateIncome_commercial(): Promise<SummationRow[]> {
  console.log("상권별 추정매출 받아오는 중...");
  const raw: getSeoulEstimateIncome_Param[] = await getSeoulEstimateIncome_commercial();

  const subToTop = buildReverseMap(categoryMap);

  // districtName(상권) → (대분류 → 점포수)
  const acc = new Map<string, Map<string, number>>();

  for (const r of raw) {
    const districtName = r.TRDAR_CD_NM;        // 상권명
    const sub = r.SVC_INDUTY_CD_NM;            // 소분류명
    const top = subToTop.get(sub) ?? "기타";    // 대분류 매핑 실패 시 "기타"
    const cnt = Number(r.THSMON_SELNG_AMT ?? 1);

    // 상권 버킷
    let byTop = acc.get(districtName);
    if (!byTop) {
      byTop = new Map<string, number>();
      acc.set(districtName, byTop);
    }

    // 대분류 누적
    byTop.set(top, (byTop.get(top) ?? 0) + cnt);
  }

  // Map → 배열 (districtName 중복 없음)
  const result: SummationRow[] = Array.from(acc.entries()).map(([districtName, list]) => ({
    districtName,
    list,
  }));

  return result;
}


export async function pushSummationEstimateIncome_hinterland(): Promise<SummationRow[]> {
  console.log("상권별 추정매출 받아오는 중...");
  const raw: getSeoulEstimateIncome_Param[] = await getSeoulEstimateIncome_hinterland();

  const subToTop = buildReverseMap(categoryMap);

  // districtName(상권) → (대분류 → 점포수)
  const acc = new Map<string, Map<string, number>>();

  for (const r of raw) {
    const districtName = r.TRDAR_CD_NM;        // 상권명
    const sub = r.SVC_INDUTY_CD_NM;            // 소분류명
    const top = subToTop.get(sub) ?? "기타";    // 대분류 매핑 실패 시 "기타"
    const cnt = Number(r.THSMON_SELNG_AMT ?? 1);

    // 상권 버킷
    let byTop = acc.get(districtName);
    if (!byTop) {
      byTop = new Map<string, number>();
      acc.set(districtName, byTop);
    }

    // 대분류 누적
    byTop.set(top, (byTop.get(top) ?? 0) + cnt);
  }

  // Map → 배열 (districtName 중복 없음)
  const result: SummationRow[] = Array.from(acc.entries()).map(([districtName, list]) => ({
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
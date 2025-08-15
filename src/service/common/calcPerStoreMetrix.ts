/**
 * 설명
 * 상점당 매트릭스 계산 함수
 * 
 */



import { AreaFilter, makeNameSelectors } from "./area.ts";
import { getAverage, round } from "./math.ts";
import { getLabel, Label } from "./label.ts";
import { getStoreCountMap_commercial } from "./getStoreCountMap.ts";




export type numeratorType = {
  code: string;
  name: string;
  value: number;
  quarter: string;
};

export type PerStoreRow = numeratorType & {
  storeCount: number;
  perStore: number;
};
export type PerStoreResult = {
  interestAvg: number;
  regionAvg: number;
  ratio: number;
  label: Label;
  rows: PerStoreRow[];
};

export async function calcPerStoreMetrix(params: {
  /**
   * 지역 필터
   * - gu: 구 이름
   * - dong: 동 이름
   * - trdarName: 상권 이름
   */
  area: AreaFilter;
  numeratorFetcher: (svcCode?: string) => Promise<numeratorType[]>; // income은 svcCode 사용
  svcCode?: string;
}): Promise<PerStoreResult> {
  const { area, numeratorFetcher, svcCode } = params;

  const numerators = await numeratorFetcher(svcCode);
  const storeMap = await getStoreCountMap_commercial(svcCode);

  const rows: PerStoreRow[] = [];
  for (const n of numerators) {
    const denom = storeMap.get(n.code)?.count ?? 0;
    if (denom <= 0) continue;
    rows.push({ ...n, storeCount: denom, perStore: n.value / denom });
  }

  const { inRegion, inInterest } = makeNameSelectors(area);
  const interestAvg = getAverage(rows.filter(r => inInterest(r.name)).map(r => r.perStore));
  const regionAvg   = getAverage(rows.filter(r => inRegion(r.name)).map(r => r.perStore));

  const ratio = regionAvg > 0 ? round(interestAvg / regionAvg,4) : 0;
  const label = getLabel(ratio);

  rows.sort((a,b)=> b.perStore - a.perStore);
  return { interestAvg: round(interestAvg,4), regionAvg: round(regionAvg,4), ratio, label, rows };
}
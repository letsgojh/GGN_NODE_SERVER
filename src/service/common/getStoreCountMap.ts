/**
 * 1. 배후지 점포 데이터 불러오기
 * 2. svcCode 지정되면 해당 업종만 필터링
 * 3. 상권 코드별로 점포 수를 누적하기
 * 4. Map 형태로 반환
 * 
 * getStoreCountMap_commercial: 서울 상업지역 점포 수
 * getStoreCountMap_hinterland: 서울 배후지 점포 수
 */



import { getSeoulMarketCount_commercial } from "../../domain/index.ts";
import { getSeoulMarketCount_hinterland } from "../../domain/index.ts";
import type { getSeoulMarketCount_Param } from "../../domain/types.ts";

export async function getStoreCountMap_commercial(svcCode?:string){
  const stores: getSeoulMarketCount_Param[] = await getSeoulMarketCount_commercial();
  const map = new Map<string, { name: string; count: number }>();

  for (const s of stores) {
    if (svcCode && s.SVC_INDUTY_CD !== svcCode) continue;
    const cur = map.get(s.TRDAR_CD);
    const add = Number(s.STOR_CO) || 0;
    if (cur) cur.count += add;
    else map.set(s.TRDAR_CD, { name: s.TRDAR_CD_NM, count: add });
  }
  return map;
}



export async function getStoreCountMap_hinterland(svcCode?:string){
  const stores: getSeoulMarketCount_Param[] = await getSeoulMarketCount_hinterland();
  const map = new Map<string, { name: string; count: number }>();

  for (const s of stores) {
    if (svcCode && s.SVC_INDUTY_CD !== svcCode) continue;
    const cur = map.get(s.TRDAR_CD);
    const add = Number(s.STOR_CO) || 0;
    if (cur) cur.count += add;
    else map.set(s.TRDAR_CD, { name: s.TRDAR_CD_NM, count: add });
  }
  return map;
}
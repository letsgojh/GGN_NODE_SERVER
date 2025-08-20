import {
  getSeoulStorePrice_Param,
  getSeoulEstimateIncome_district_Param
} from '../types.ts'

import {
  getSeoulStorePrice,
  getSeoulEstimateIncome_district,
} from '../calledData.ts'
import { mapToJson } from '../../utils/JsonParser/MapToJson.ts';
import { saveJson } from '../../utils/JsonParser/SaveJson.ts';
import { fileExists } from '../../utils/existFile.ts';
import { loadJson } from '../../utils/JsonParser/LoadJson.ts';
import { jsonToMap } from '../../utils/JsonParser/JsonToMap.ts';

// 평당임대료 더해서 평균 구해야 함(수정 필요)
export async function getRent() : Promise<Map<string,number>>{
  let RentMap = new Map<string, number>();
  const rentMapPlusCount = new Map<string,number>();
  
  
  if(!fileExists("GuRent")){
    const RentList : getSeoulStorePrice_Param[] = await getSeoulStorePrice();
    for(let RentItem of RentList){
      if(RentItem.RENT_SE ==="전세"){
        continue;
      }
      if(!RentMap.has(RentItem.CGG_NM)){
        RentMap.set(RentItem.CGG_NM, RentItem.RTFE/RentItem.RENT_AREA);
        rentMapPlusCount.set(RentItem.CGG_NM,1);
      }
      else{
        RentMap.set(RentItem.CGG_NM, RentMap.get(RentItem.CGG_NM)! + RentItem.RTFE/RentItem.RENT_AREA);
        rentMapPlusCount.set(RentItem.CGG_NM,(rentMapPlusCount.get(RentItem.CGG_NM)!)+1);
      }
    }
    for(let key of rentMapPlusCount.keys()){
      RentMap.set(key,RentMap.get(key)!/rentMapPlusCount.get(key)!)
    }
    saveJson("GuRent",mapToJson(RentMap));
  }
  else{
    RentMap = jsonToMap(loadJson("GuRent"));
  }
  return RentMap;
}

export async function getPredictedIncome_gu():Promise<Map<string,number>>{
  let incomeMap = new Map<string,number>();
  const incomeMapPlusCount = new Map<string,number>();
  if(!fileExists("GuEstimatedIncome")){
    const incomeList : getSeoulEstimateIncome_district_Param[] = await getSeoulEstimateIncome_district();
    for(let incomeItem of incomeList){
      if(!incomeMap.has(incomeItem.SIGNGU_CD_NM)){
            incomeMap.set(incomeItem.SIGNGU_CD_NM, incomeItem.THSMON_SELNG_AMT);
            incomeMapPlusCount.set(incomeItem.SIGNGU_CD_NM,1);
        }
        else{
            incomeMap.set(incomeItem.SIGNGU_CD_NM, (incomeMap.get(incomeItem.SIGNGU_CD_NM)?? 0 )+ incomeItem.THSMON_SELNG_AMT);
            incomeMapPlusCount.set(incomeItem.SIGNGU_CD_NM,(incomeMapPlusCount.get(incomeItem.SIGNGU_CD_NM)??0)+1);
        }
    }
    for(let key of incomeMap.keys()){
      incomeMap.set(key, (incomeMap.get(key) ?? 0) / (incomeMapPlusCount.get(key) ?? 1));
    }
    saveJson("GuEstimatedIncome",mapToJson(incomeMap));
  }
  else{
    incomeMap= jsonToMap(loadJson("GuEstimatedIncome"));
  }
  return incomeMap;
}

async function main(){

  const ans1 = await getPredictedIncome_gu();
  const ans2 = await getRent();
  console.log(ans1);
  console.log(ans2);
}
main();
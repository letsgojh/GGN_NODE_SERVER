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
  getPredictedIncomePerPop_Param,
  getPredictedIncomePerRent_Param,
  getSeoulEstimateIncome_district_Param
} from '../../../domain/types.js'

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
  getSeoulEstimateIncome_district,
} from '../../../domain/calledData.js'
import { mapToJson } from '../../../utils/JsonParser/MapToJson.js';
import { saveJson } from '../../../utils/JsonParser/SaveJson.js';
import { fileExists } from '../../../utils/existFile.js';
import { loadJson } from '../../../utils/JsonParser/LoadJson.js';
import { jsonToMap } from '../../../utils/JsonParser/JsonToMap.js';


export async function getPredictedIncomePerLent_commercial(gu: string) : Promise<getPredictedIncomePerRent_Param>{
  let lentMap = new Map<string, number>();
  let incomeMap=new Map<string, number>();
  const incomeMapPlusCount = new Map<String,number>();
  let regionMap = new Map<string,string>();
  let oneLentPerPredictedIncome: number = 0;
  let totalLentPerPredictedIncome : number =0;
  let count = 0;
  
  if(!fileExists("lentPerPyeong")){
    console.log("lentPerPyeong파일 없어서 생성합니다.");
    const lentList : getSeoulStorePrice_Param[] = await getSeoulStorePrice();
    for(let lentItem of lentList){
      if(lentItem.RENT_SE ==="전세"){
        continue;
      }
      if(!lentMap.has(lentItem.CGG_CD)){
        lentMap.set(lentItem.CGG_CD, lentItem.RTFE/lentItem.RENT_AREA);
      }
      else{
        lentMap.set(lentItem.CGG_CD, lentMap.get(lentItem.CGG_CD)! + lentItem.RTFE/lentItem.RENT_AREA);
      }
    }
    saveJson("lentPerPyeong",mapToJson(lentMap));
  }
  else{
    console.log("lentperPyeong파일 있습니다.");
    lentMap = jsonToMap(loadJson("lentPerPyeong"));
  }
  // lentList[자치구 코드] = 평당 임대료(월세만 계산)
  // incomeMap[자치구 코드] = 해당 자치구 추정 매출의 합
  // incomeMapPlusCount[자치구 코드] = 해당 자치구 추정 매출의 합 더한 횟수(평균구하기 위해서 만든 맵)
  if(!fileExists("guPredictedIncome")){
    console.log("guPredictedIncome 파일이 없어서 생성합니다.");
    const incomeList : getSeoulEstimateIncome_district_Param[] = await getSeoulEstimateIncome_district();
    for(let incomeItem of incomeList){
      if(!incomeMap.has(incomeItem.SIGNGU_CD)){
            regionMap.set(incomeItem.SIGNGU_CD, incomeItem.SIGNGU_CD_NM);
            incomeMap.set(incomeItem.SIGNGU_CD, incomeItem.THSMON_SELNG_AMT);
            incomeMapPlusCount.set(incomeItem.SIGNGU_CD,1);
        }
        else{
            incomeMap.set(incomeItem.SIGNGU_CD, (incomeMap.get(incomeItem.SIGNGU_CD)?? 0 )+ incomeItem.THSMON_SELNG_AMT);
            incomeMapPlusCount.set(incomeItem.SIGNGU_CD,(incomeMapPlusCount.get(incomeItem.SIGNGU_CD)??0)+1);
        }
    }
    for(let key of incomeMap.keys()){
      incomeMap.set(key, (incomeMap.get(key) ?? 0) / (incomeMapPlusCount.get(key) ?? 1));
    }
    saveJson("guPredictedIncome",mapToJson(incomeMap));
    saveJson("regionMap",mapToJson(regionMap));
  }
  else{
    console.log("guPredictedIncome 파일이 있습니다.");
    incomeMap= jsonToMap(loadJson("guPredictedIncome"));
    regionMap = jsonToMap(loadJson("regionMap"));
  }
  /**
   * 1. 해당 자치구 매출액 평균 구하기
   * 2. 헤딩자치구 해당 자치구 매출액 평균 / 평당 임대료 을 lentMap에 넣음
   * 3. 하나의 자치구 매출액 / 임대료 을 저장하기
   * 4. totalLentPerPredictedIncome 에다가 다 더한 후 더한 횟수만큼 나누기
   */
  for(let key of incomeMap.keys()){
      lentMap.set(key,(incomeMap.get(key)??0)/(lentMap.get(key)??0))
      count++;
      if(regionMap.get(key) === gu){
          oneLentPerPredictedIncome=lentMap.get(key)??0;
      }
      totalLentPerPredictedIncome+= lentMap.get(key)??0;
  }

  totalLentPerPredictedIncome/=count;
  

  const ans : getPredictedIncomePerRent_Param = {
      PREDICTED_INCOME_PER_RENT : oneLentPerPredictedIncome/totalLentPerPredictedIncome
  }

  return ans;

}

async function main(){
  console.log("test code");
  const res :getPredictedIncomePerRent_Param = await getPredictedIncomePerLent_commercial("종로구");
  console.log(res);
}

main();
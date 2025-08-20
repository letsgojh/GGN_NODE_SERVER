import {
    getSeoulCommercialDistrict_commercial_Param,
    getSeoulCommercialDistrict_hinterland_Param,
    getSeoulEstimateIncome_Param,
} from '../types.ts'

import {
    getSeoulEstimateIncome_commercial,
    getSeoulEstimateIncome_hinterland,
    getSeoulCommercialDistrict_commercial,
    getSeoulCommercialDistrict_hinterland,
} from '../calledData.ts'



import { fileExists } from '../../utils/existFile.ts';
import { saveJson } from '../../utils/JsonParser/SaveJson.ts';
import { mapToJson } from '../../utils/JsonParser/MapToJson.ts';
import { loadJson } from '../../utils/JsonParser/LoadJson.ts';
import { jsonToMap } from '../../utils/JsonParser/JsonToMap.ts';
import { categoryMap } from '../industry/category.ts';


function getOrCreate<K, V>(map: Map<K, V>, key: K, factory: () => V): V {
    const existed = map.get(key);
    if (existed !== undefined) return existed;
    const value = factory();
    map.set(key, value);
    return value;
}
function buildReverseMap(catMap: Record<string, string[]>) {
  const reverse = new Map<string, string>();
  for (const [top, subs] of Object.entries(catMap)) {
    for (const sub of subs) reverse.set(sub, top);
  }
  return reverse;
}

export async function getEstimatedIncomeCommercial() : Promise<Map<string,Map<string,Map<string,number>>>>{
    let incomeMap = new Map<string,Map<string, Map<string, number>>>();
    if(!fileExists("EstimatedIncomeCommercial")){
        const regionCommercial : getSeoulCommercialDistrict_commercial_Param[]=await getSeoulCommercialDistrict_commercial();
        const seoulEstimatedIncome: getSeoulEstimateIncome_Param[] = await getSeoulEstimateIncome_commercial();
        const areaToDistrict = new Map<string,string>();
        const subToTop = buildReverseMap(categoryMap);
        for(let region of regionCommercial){
          const districtName = `${region.SIGNGU_CD_NM} ${region.ADSTRD_CD_NM}`;
          areaToDistrict.set(region.TRDAR_CD_NM,districtName);
        }
        for(let market of seoulEstimatedIncome){
          const areaName = market.TRDAR_CD_NM;
          const districtName = areaToDistrict.get(areaName);
          if(!districtName) continue;

          const sub = market.SVC_INDUTY_CD_NM;
          const serviceName = subToTop.get(sub) ?? "기타";
          const cost = Number(market.THSMON_SELNG_AMT??0);
          const districtBucket =getOrCreate(incomeMap,districtName,()=>new Map());
          const areaBucket = getOrCreate(districtBucket,areaName,()=>new Map());
          areaBucket.set(serviceName,cost);

        }


        for (const [, areaMap] of incomeMap) {
          for (const [, serviceMap] of areaMap) {
            let total = 0;
            for (const [svc, n] of serviceMap) {
              if (svc === "total") continue;
              total += n;
            }
            serviceMap.set("total", total);
          }
        }

        saveJson("EstimatedIncomeCommercial",mapToJson(incomeMap));
    }
    else{
        incomeMap = jsonToMap(loadJson("EstimatedIncomeCommercial"));
    }
    return incomeMap;
}

export async function getEstimatedIncomeHinterland() : Promise<Map<string,Map<string,Map<string,number>>>>{
  let incomeMap = new Map<string,Map<string, Map<string, number>>>();
    if(!fileExists("EstimatedIncomeHinterland")){
        const regionCommercial : getSeoulCommercialDistrict_hinterland_Param[]=await getSeoulCommercialDistrict_hinterland();
        const seoulEstimatedIncome: getSeoulEstimateIncome_Param[] = await getSeoulEstimateIncome_hinterland();
        const areaToDistrict = new Map<string,string>();
        const subToTop = buildReverseMap(categoryMap);
        for(let region of regionCommercial){
          const districtName = `${region.SIGNGU_CD_NM} ${region.ADSTRD_CD_NM}`;
          areaToDistrict.set(region.ALLEY_TRDAR_NM,districtName);
        }
        for(let market of seoulEstimatedIncome){
          const areaName = market.TRDAR_CD_NM;
          const districtName = areaToDistrict.get(areaName);
          if(!districtName) continue;

          const sub = market.SVC_INDUTY_CD_NM;
          const serviceName = subToTop.get(sub) ?? "기타";
          const cost = Number(market.THSMON_SELNG_AMT??0);
          const districtBucket =getOrCreate(incomeMap,districtName,()=>new Map());
          const areaBucket = getOrCreate(districtBucket,areaName,()=>new Map());
          areaBucket.set(serviceName,cost);

        }


        for (const [, areaMap] of incomeMap) {
          for (const [, serviceMap] of areaMap) {
            let total = 0;
            for (const [svc, n] of serviceMap) {
              if (svc === "total") continue;
              total += n;
            }
            serviceMap.set("total", total);
          }
        }

        saveJson("EstimatedIncomeHinterland",mapToJson(incomeMap));
    }
    else{
        incomeMap = jsonToMap(loadJson("EstimatedIncomeHinterland"));
    }
    return incomeMap;
}

getEstimatedIncomeCommercial();
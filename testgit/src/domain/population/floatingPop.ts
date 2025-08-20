import {
    getSeoulFloatingPopulation_Param,
    getSeoulCommercialDistrict_commercial_Param,
    getSeoulCommercialDistrict_hinterland_Param,
} from '../types.ts'

import {
    getSeoulFloatingPopulation_commercial,
    getSeoulFloatingPopulation_hinterland,
    getSeoulCommercialDistrict_commercial,
    getSeoulCommercialDistrict_hinterland,
} from '../calledData.ts'



import { fileExists } from '../../utils/existFile.ts';
import { saveJson } from '../../utils/JsonParser/SaveJson.ts';
import { mapToJson } from '../../utils/JsonParser/MapToJson.ts';
import { loadJson } from '../../utils/JsonParser/LoadJson.ts';
import { jsonToMap } from '../../utils/JsonParser/JsonToMap.ts';


function getOrCreate<K, V>(map: Map<K, V>, key: K, factory: () => V): V {
    const existed = map.get(key);
    if (existed !== undefined) return existed;
    const value = factory();
    map.set(key, value);
    return value;
}

export async function getFloatingPop_commercial() : Promise<Map<string,Map<string,number>>>{
    let populationMap = new Map<string, Map<string, number>>();
    if(!fileExists("FloatingPopulationCommercial")){
        const regionCommercial : getSeoulCommercialDistrict_commercial_Param[]=await getSeoulCommercialDistrict_commercial();
        const seoulFloatingPopulation: getSeoulFloatingPopulation_Param[] = await getSeoulFloatingPopulation_commercial();
        let districtName : string;
        let commercialName: string;
        let districtMap = new Map<string, string>();
        for(let commercial of regionCommercial){
            districtName =`${commercial.SIGNGU_CD_NM} ${commercial.ADSTRD_CD_NM}`;
            commercialName = commercial.TRDAR_CD_NM;
            districtMap.set(commercialName,districtName);
            const inner = getOrCreate(populationMap,districtName,()=>new Map<string,number>());
            if(!inner.has(commercialName)){
                inner.set(commercialName,0);
            }
        
        }
        for(let population of seoulFloatingPopulation){
            commercialName = population.TRDAR_CD_NM;
            districtName = districtMap.get(commercialName) || '';
            if(!districtName){
                console.warn('Unknown districtName');
                continue;
            }
            const inner = getOrCreate(populationMap,districtName,()=>new Map<string,number>());
            inner.set(commercialName, Number(population.TOT_FLPOP_CO) || 0);
        }
        for (const [districtName, areaMap] of populationMap.entries()) {
            let total = 0;
            for (const value of areaMap.values()) {
              total += value;
            }
            // total 추가
            areaMap.set("total", total);
        }
        saveJson("FloatingPopulationCommercial",mapToJson(populationMap));
    }
    else{
        populationMap = jsonToMap(loadJson("FloatingPopulationCommercial"));
    }
    return populationMap;
}

export async function getFloatingPop_hinterland() : Promise<Map<string,Map<string,number>>>{
    let populationMap = new Map<string, Map<string, number>>();
    if(!fileExists("FloatingPopulationHinterland")){
        const regionCommercial : getSeoulCommercialDistrict_hinterland_Param[]=await getSeoulCommercialDistrict_hinterland();
        const seoulFloatingPopulation: getSeoulFloatingPopulation_Param[] = await getSeoulFloatingPopulation_hinterland();
        let districtName : string;
        let commercialName: string;
        let districtMap = new Map<string, string>();
        for(let commercial of regionCommercial){
            districtName =`${commercial.SIGNGU_CD_NM} ${commercial.ADSTRD_CD_NM}`;
            commercialName = commercial.ALLEY_TRDAR_NM;
            districtMap.set(commercialName,districtName);
            const inner = getOrCreate(populationMap,districtName,()=>new Map<string,number>());
            if(!inner.has(commercialName)){
                inner.set(commercialName,0);
            }
        
        }
        for(let population of seoulFloatingPopulation){
            commercialName = population.TRDAR_CD_NM;
            districtName = districtMap.get(commercialName) || '';
            if(!districtName){
                console.warn('Unknown districtName');
                continue;
            }
            const inner = getOrCreate(populationMap,districtName,()=>new Map<string,number>());
            inner.set(commercialName, Number(population.TOT_FLPOP_CO) || 0);
        }
        for (const [districtName, areaMap] of populationMap.entries()) {
            let total = 0;
            for (const value of areaMap.values()) {
              total += value;
            }
            // total 추가
            areaMap.set("total", total);
        }
        saveJson("FloatingPopulationHinterland",mapToJson(populationMap));
    }
    else{
        populationMap = jsonToMap(loadJson("FloatingPopulationHinterland"));
    }
    return populationMap;
}

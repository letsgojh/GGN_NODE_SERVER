import {
    getResidentPopulation_Param,
    getSeoulCommercialDistrict_commercial_Param,
    getSeoulCommercialDistrict_hinterland_Param,
} from '../types.ts'

import {
    getResidentPopulation_commercial,
    getResidentPopulation_hinterland,
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

export async function getResidentPop_commercial() : Promise<Map<string,Map<string,number>>>{
    let populationMap = new Map<string, Map<string, number>>();
    if(!fileExists("ResidentPopulationCommercial")){
        const regionCommercial : getSeoulCommercialDistrict_commercial_Param[]=await getSeoulCommercialDistrict_commercial();
        const seoulResidentPopulation: getResidentPopulation_Param[] = await getResidentPopulation_commercial();
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
        for(let population of seoulResidentPopulation){
            commercialName = population.TRDAR_CD_NM;
            districtName = districtMap.get(commercialName) || '';
            if(!districtName){
                console.warn('Unknown districtName');
                continue;
            }
            const inner = getOrCreate(populationMap,districtName,()=>new Map<string,number>());
            inner.set(commercialName, Number(population.TOT_REPOP_CO) || 0);
        }
        for (const [districtName, areaMap] of populationMap.entries()) {
            let total = 0;
            for (const value of areaMap.values()) {
              total += value;
            }
            // total 추가
            areaMap.set("total", total);
        }
        saveJson("ResidentPopulationCommercial",mapToJson(populationMap));
    }
    else{
        populationMap = jsonToMap(loadJson("ResidentPopulationCommercial"));
    }
    return populationMap;
}

export async function getResidentPop_hinterland() : Promise<Map<string,Map<string,number>>>{
    let populationMap = new Map<string, Map<string, number>>();
    if(!fileExists("ResidentPopulationHinterland")){
        const regionCommercial : getSeoulCommercialDistrict_hinterland_Param[]=await getSeoulCommercialDistrict_hinterland();
        const seoulResidentPopulation: getResidentPopulation_Param[] = await getResidentPopulation_hinterland();
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
        for(let population of seoulResidentPopulation){
            commercialName = population.TRDAR_CD_NM;
            districtName = districtMap.get(commercialName) || '';
            if(!districtName){
                console.warn('Unknown districtName');
                continue;
            }
            const inner = getOrCreate(populationMap,districtName,()=>new Map<string,number>());
            inner.set(commercialName, Number(population.TOT_REPOP_CO) || 0);
        }
        for (const [districtName, areaMap] of populationMap.entries()) {
            let total = 0;
            for (const value of areaMap.values()) {
              total += value;
            }
            // total 추가
            areaMap.set("total", total);
        }
        saveJson("ResidentPopulationHinterland",mapToJson(populationMap));
    }
    else{
        populationMap = jsonToMap(loadJson("ResidentPopulationHinterland"));
    }
    return populationMap;
}


export function t3() : Map<string,Map<string,number>>{

    const populationMap:Map<string,Map<string,number>> = jsonToMap(loadJson("ResidentPopulationCommercial"));
    
    return populationMap;
}

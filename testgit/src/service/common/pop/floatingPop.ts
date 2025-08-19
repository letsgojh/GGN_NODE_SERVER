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
} from '../../../domain/calledData.js'


import {
    getSanggwon_By_Region_commercial,
    getSanggwon_By_Region_hinterland,
    
} from '../../convenient_store/service.js'
import {getMarketCount_by_category} from "../industry/bigIndustry.js"
import { Category, getCategory } from '../industry/category.js';


export type getFloatPopPerStore_Param ={
    float : number;
}

export async function getFloatPopPerStore_commercial(auto : string, admin : string, industry : string) : Promise<getFloatPopPerStore_Param>{
    //지역의 상권이름 string[] 형태로 반환
    const commercialDistrict_by_region : string[] = await getSanggwon_By_Region_commercial(auto,admin)    
    //상권별 유동인구
    const seoulFloatingPopulation : getSeoulFloatingPopulation_Param[] = await getSeoulFloatingPopulation_commercial()
    //지역의 총 유동인구 수 담을 변수(일단 총 유동인구만)
    let totalFloatingPop : number = 0;


    //시간복잡도.. 너무 오래걸림 -> 알고리즘 리팩토링(리팩토링 대상)
    console.log(`지역별 총 유동인구 계산 중...`)

    for(let tmp1 of commercialDistrict_by_region){
        for(let tmp2 of seoulFloatingPopulation){
            if(tmp2.TRDAR_CD_NM	 === tmp1){
                totalFloatingPop += tmp2.TOT_FLPOP_CO
            }
        }
    }

    //상권별 점포수 -> 업종별로 구분
    const seoulMarketCount_commercial : getSeoulMarketCount_Param[] = await getSeoulMarketCount_commercial()
    //대분류 -> 소분류 리스트 받아오기
    const list : Category = await getCategory(industry)
    //업종명에 해당하는 상권정보만 받아오기
    let seoulMarketCount_by_industry : getSeoulMarketCount_Param[] = await getMarketCount_by_category(list.items,seoulMarketCount_commercial)


    //총 점포수 담을 변수
    let totalMarketCount : number = 0;

    console.log(`상권별 점포수 계산 중...`)

    for(let tmp1 of commercialDistrict_by_region){
        for(let tmp2 of seoulMarketCount_commercial){
            if(tmp2.TRDAR_CD_NM	 === tmp1){
                totalMarketCount += tmp2.STOR_CO
            }
        }
    }

    const ans : getFloatPopPerStore_Param = {
        float : totalFloatingPop/totalMarketCount
    }

    return ans
}

export async function getFloatPopPerStore_hinterland(auto : string, admin : string, industry : string) : Promise<getFloatPopPerStore_Param>{
    //지역의 상권이름 string[] 형태로 반환
    const commercialDistrict_by_region : string[] = await getSanggwon_By_Region_hinterland(auto,admin)    
    //상권별 유동인구
    const seoulFloatingPopulation : getSeoulFloatingPopulation_Param[] = await getSeoulFloatingPopulation_hinterland()
    //지역의 총 유동인구 수 담을 변수(일단 총 유동인구만)
    let totalFloatingPop : number = 0;


    console.log(`지역별 총 유동인구 계산 중...`)

    for(let tmp1 of commercialDistrict_by_region){
        for(let tmp2 of seoulFloatingPopulation){
            if(tmp2.TRDAR_CD_NM	 === tmp1){
                totalFloatingPop += tmp2.TOT_FLPOP_CO
            }
        }
    }

    //상권별 점포수 -> 업종별로 구분해야되는데.. 일단 전체 점포수 들고오자(리팩토링 대상)
    const seoulMarketCount_commercial : getSeoulMarketCount_Param[] = await getSeoulMarketCount_hinterland()
    //대분류 -> 소분류 리스트 받아오기
    const list : Category = await getCategory(industry)
    //업종명에 해당하는 상권정보만 받아오기
    let seoulMarketCount_by_industry : getSeoulMarketCount_Param[] = await getMarketCount_by_category(list.items,seoulMarketCount_commercial)


        //총 점포수 담을 변수
    let totalMarketCount : number = 0;

    console.log(`상권별 점포수 계산 중...`)

    for(let tmp1 of commercialDistrict_by_region){
        for(let tmp2 of seoulMarketCount_by_industry){
            if(tmp2.TRDAR_CD_NM	 === tmp1){
                totalMarketCount += tmp2.STOR_CO
            }
        }
    }

    const ans : getFloatPopPerStore_Param = {
        float : totalFloatingPop/totalMarketCount
    }

    return ans
}
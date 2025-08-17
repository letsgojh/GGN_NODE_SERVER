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


import {
    getSanggwon_By_Region_commercial,
    getSanggwon_By_Region_hinterland,
    
} from '../../convenient_store/service.ts'

import {getMarketCount_by_category} from "../industry/bigIndustry.ts"
import { Category, getCategory } from '../industry/category.ts';



export type getCompanyPopPerStore_Param ={
    company : number;
}

export async function getCompanyPopPerStore_commercial(auto : string,admin : string, industry : string) : Promise<getCompanyPopPerStore_Param>{
    //지역의 상권이름 string[] 형태로 반환
    const commercialDistrict_by_region : string[] = await getSanggwon_By_Region_commercial(auto,admin)    

    //상권별 직장인구
    const seoulCompanyPopulation : getCompanyPopulation_Param[] = await getSeoulCompanyPopulation_commercial()
    //지역의 총 직장인구 수 담을 변수(일단 총 직장인구만)
    let totalCompanyPop : number = 0;



    //시간복잡도.. 너무 오래걸림 -> 알고리즘 리팩토링(리팩토링 대상)
    console.log(`지역별 총 직장인구 계산 중...`)

    for(let tmp1 of commercialDistrict_by_region){
        for(let tmp2 of seoulCompanyPopulation){
            if(tmp2.TRDAR_CD_NM	 === tmp1){
                totalCompanyPop += tmp2.TOT_WRC_POPLTN_CO
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
        for(let tmp2 of seoulMarketCount_by_industry){
            if(tmp2.TRDAR_CD_NM	 === tmp1){
                totalMarketCount += tmp2.STOR_CO
            }
        }
    }

    const ans : getCompanyPopPerStore_Param = {
        company : totalCompanyPop/totalMarketCount
    }
    

    return ans    
}

export async function getCompanyPopPerStore_hinterland(auto : string,admin : string, industry : string) : Promise<getCompanyPopPerStore_Param>{
    //지역의 상권이름 string[] 형태로 반환
    const commercialDistrict_by_region : string[] = await getSanggwon_By_Region_hinterland(auto,admin)    

    //상권별 직장인구
    const seoulCompanyPopulation : getCompanyPopulation_Param[] = await getSeoulCompanyPopulation_hinterland()
    //지역의 총 직장인구 수 담을 변수(일단 총 직장인구만)
    let totalCompanyPop : number = 0;



    //시간복잡도.. 너무 오래걸림 -> 알고리즘 리팩토링(리팩토링 대상)
    console.log(`지역별 총 직장인구 계산 중...`)

    for(let tmp1 of commercialDistrict_by_region){
        for(let tmp2 of seoulCompanyPopulation){
            if(tmp2.TRDAR_CD_NM	 === tmp1){
                totalCompanyPop += tmp2.TOT_WRC_POPLTN_CO
            }
        }
    }

    //상권별 점포수 -> 업종별로 구분
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

    const ans : getCompanyPopPerStore_Param = {
        company : totalCompanyPop/totalMarketCount
    }
    

    return ans    
}
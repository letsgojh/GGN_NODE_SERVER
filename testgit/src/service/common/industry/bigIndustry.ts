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
import { getSanggwon_By_Region_commercial } from '../../convenient_store/service.ts';
import { Category } from './category.ts';

//grade로 대분류 -> 소분류 리스트 받은 후, 소분류 리스트에 해당하는 점포수만 받아오기

export async function getMarketCount_by_category(categoryList : string[],list : getSeoulMarketCount_Param[]) : Promise<getSeoulMarketCount_Param[]>{    
    let ans : getSeoulMarketCount_Param[] = []

    //대분류 업종에 해당하는 상권만 추려내기
    for(let tmp1 of list){
        for(let tmp2 of categoryList ){ //null값일시 빈배열로 대체
            if(tmp2 === tmp1.SVC_INDUTY_CD_NM){
                ans.push(tmp1)
            }
        }
    }

    return ans
}
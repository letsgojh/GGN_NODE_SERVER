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
} from '../../domain/types.ts'

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
} from '../../domain/calledData.ts'

import {judgeByCondition} from './caculate.ts'
import {getSaturation} from './saturation.ts'

//유리,보통,불리 판단 type
export type Grade = {
    float : string,
    company : string,
    resident : string
}   
export async function calculateGrade(auto : string, admin : string, name : string,func : getTotalPopPerStore_Param) : Promise<Grade>{

 
    //const tmp : getTotalPopPerStore_Param = await getSaturation(auto,admin,name)
    const tmp : getTotalPopPerStore_Param = func
    
    let ans : Grade = {
        float : "",
        company : "",
        resident : ""
    }

    ans.float = await judgeByCondition(tmp.TOTAL_FLOATING_POP_PER_STORE)
    ans.company = await judgeByCondition(tmp.TOTAL_COMPANY_POP_PER_STORE)
    ans.resident = await judgeByCondition(tmp.TOTAL_RESIDENT_POP_PER_STORE)

    console.log(ans.float)
    console.log(ans.company)
    console.log(ans.resident)
    
    return ans
}

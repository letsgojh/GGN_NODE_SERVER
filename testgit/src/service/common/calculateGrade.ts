import {
<<<<<<< HEAD
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
} from '../../domain/populationDomain.ts'

import {judgeByCondition} from './calculate.ts'
import {getSaturation} from './saturation.ts'

//유리,보통,불리 판단 type
export type Grade = {
=======
    getTotalPopPerStore_Param,
    getPredictedIncomePerRent_Param
} from '../../domain/types.ts'

//유리,보통,불리 판단 type
export type Grade_Pop = {
>>>>>>> fabc089f1f5ac97fc7ad2816dc0559a771749ede
    float : string,
    company : string,
    resident : string
}   
<<<<<<< HEAD
export async function calculateGrade(auto : string, admin : string, name : string,func : getTotalPopPerStore_Param) : Promise<Grade>{
=======

export type Grade_Income = {
    income: string
}

async function judgeByCondition(number : number) : Promise<string>{
    if(number > 1.3){
        return "유리"
    }else if(number >= 1.1 && number <= 1.3 ){
        return "적정"
    }else{
        return "불리"
    }
}

async function judgeByCondition_Income(number : number) : Promise<string>{
    if(number > 1.34){
        return "유리"
    }else if(number >= 0.75 && number <= 1.34 ){
        return "적정"
    }else{
        return "불리"
    }
}


export async function calculateGrade_Pop(auto : string, admin : string, name : string,func : getTotalPopPerStore_Param) : Promise<Grade_Pop>{
>>>>>>> fabc089f1f5ac97fc7ad2816dc0559a771749ede

 
    //const tmp : getTotalPopPerStore_Param = await getSaturation(auto,admin,name)
    const tmp : getTotalPopPerStore_Param = func
    
<<<<<<< HEAD
    let ans : Grade = {
=======
    let ans : Grade_Pop = {
>>>>>>> fabc089f1f5ac97fc7ad2816dc0559a771749ede
        float : "",
        company : "",
        resident : ""
    }

    ans.float = await judgeByCondition(tmp.TOTAL_FLOATING_POP_PER_STORE)
    ans.company = await judgeByCondition(tmp.TOTAL_COMPANY_POP_PER_STORE)
    ans.resident = await judgeByCondition(tmp.TOTAL_RESIDENT_POP_PER_STORE)
<<<<<<< HEAD

    console.log(ans.float)
    console.log(ans.company)
    console.log(ans.resident)
    
    return ans
}
=======
    
    return ans
}

export async function calculateGrade_Income(func : getPredictedIncomePerRent_Param) : Promise<Grade_Income>{

 
    //const tmp : getTotalPopPerStore_Param = await getSaturation(auto,admin,name)
    const tmp : getPredictedIncomePerRent_Param = func
    
    let ans : Grade_Income = {
        income: ""
    }

    ans.income = await judgeByCondition_Income(tmp.PREDICTED_INCOME_PER_RENT)
    
    return ans
}



>>>>>>> fabc089f1f5ac97fc7ad2816dc0559a771749ede

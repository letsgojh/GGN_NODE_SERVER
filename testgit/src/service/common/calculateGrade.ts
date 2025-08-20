import {
    getTotalPopPerStore_Param,
    getPredictedIncomePerRent_Param
} from '../../domain/types.ts'

//유리,보통,불리 판단 type
export type Grade_Pop = {
    float : string,
    company : string,
    resident : string
}   

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

 
    //const tmp : getTotalPopPerStore_Param = await getSaturation(auto,admin,name)
    const tmp : getTotalPopPerStore_Param = func
    
    let ans : Grade_Pop = {
        float : "",
        company : "",
        resident : ""
    }

    ans.float = await judgeByCondition(tmp.TOTAL_FLOATING_POP_PER_STORE)
    ans.company = await judgeByCondition(tmp.TOTAL_COMPANY_POP_PER_STORE)
    ans.resident = await judgeByCondition(tmp.TOTAL_RESIDENT_POP_PER_STORE)
    
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




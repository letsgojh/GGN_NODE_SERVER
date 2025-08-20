import {
    getTotalPopPerStore_Param,
} from '../../domain/types.ts'

//유리,보통,불리 판단 type
export type Grade = {
    float : string,
    company : string,
    resident : string
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
    
    return ans
}


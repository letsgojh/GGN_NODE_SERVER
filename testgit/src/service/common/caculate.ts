import {
getTotalPopPerStore_commercial
}from '../common/common.ts'

import {
    getTotalPopPerStore_commercial_one_sanggwon
}from '../common/sanggwon.ts'

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
}from '../../domain/types.ts'
import { types } from 'util'


//유리,보통,불리 판단 type
export type Grade = {
    float : string,
    company : string,
    resident : string
}

//1. 지역(지역의 모든 상권) 인구 포화도 / 상권(한 상권) 인구 포화도  
//auto : 자치구, admin : 행정동, name : 상권이름
export async function calculateGrade_marketCount_by_Pop(auto : string, admin : string, name : string) : Promise<Grade>{
    //지역 인구 포화도-
    // 여기서 상권별 유동,직장,상주인구 api, 상권이름 가져오는 함수, 상권별 점포수 가져오는 api 호출 
    // + for문 돌려서 매핑
    const tmp1 : getTotalPopPerStore_Param = await getTotalPopPerStore_commercial(auto,admin)
    //상권 하나의 인구 포화도
    //여기서 상권별 유동,직장,상주인구 api, 상권별 점포수 가져오는 api 호출
    // + for문 돌려서 매
    const tmp2 : getTotalPopPerStore_Param = await getTotalPopPerStore_commercial_one_sanggwon(name)

    const result : getTotalPopPerStore_Param = {
        TOTAL_FLOATING_POP_PER_STORE: tmp1.TOTAL_FLOATING_POP_PER_STORE/tmp2.TOTAL_FLOATING_POP_PER_STORE,
        TOTAL_COMPANY_POP_PER_STORE: tmp1.TOTAL_COMPANY_POP_PER_STORE/tmp2.TOTAL_COMPANY_POP_PER_STORE,
        TOTAL_RESIDENT_POP_PER_STORE: tmp1.TOTAL_RESIDENT_POP_PER_STORE/tmp2.TOTAL_RESIDENT_POP_PER_STORE
    }

    const ans : Grade = {
        float : "",
        company : "",
        resident : ""
    }

   if(result.TOTAL_FLOATING_POP_PER_STORE < 1.1){
    ans.float = "불리"
   }
   else if(result.TOTAL_FLOATING_POP_PER_STORE >= 1.1 && result.TOTAL_FLOATING_POP_PER_STORE <= 1.3) {
    ans.float = "적정"
   }else{
    ans.float = "유리"
   }

    if(result.TOTAL_COMPANY_POP_PER_STORE < 1.1){
    ans.company = "불리"
   }
   else if(result.TOTAL_COMPANY_POP_PER_STORE >= 1.1 && result.TOTAL_COMPANY_POP_PER_STORE <= 1.3) {
    ans.company = "적정"
   }else{
    ans.company = "유리"
   }

    if(result.TOTAL_RESIDENT_POP_PER_STORE < 1.1){
    ans.resident = "불리"
   }
   else if(result.TOTAL_RESIDENT_POP_PER_STORE >= 1.1 && result.TOTAL_RESIDENT_POP_PER_STORE <= 1.3) {
    ans.resident = "적정"
   }else{
    ans.resident = "유리"
   }

    return ans
}


/*
async function main(){
    const tmp1 : any = await calculateGrade_marketCount_by_Pop("종로구","부암동","자하문터널")
    console.log(`지역 인구 포화도 / 상권 인구 포화도 : ${JSON.stringify(tmp1,null,2)}`)
}
main()
*/
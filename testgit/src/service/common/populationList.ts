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
} from '../../domain/domain.ts'
import { getSanggwon_By_Region_commercial } from '../convenient_store/service.ts';

//유리,보통,불리 판단 type
export type Grade = {
    float : string,
    company : string,
    resident : string
    
}
export async function getSaturation(auto : string, admin : string, name : string) : Promise<getTotalPopPerStore_Param>{
    

    //지역의 인구/점포수 저장할 인터페이스
    let ans1 : getTotalPopPerStore_Param = {
        TOTAL_FLOATING_POP_PER_STORE: 0,
        TOTAL_COMPANY_POP_PER_STORE: 0,
        TOTAL_RESIDENT_POP_PER_STORE: 0
    
    }

    //상권하나의 인구/점포수 저장할 인터페이스
    let ans2 : getTotalPopPerStore_Param = {
        TOTAL_FLOATING_POP_PER_STORE: 0,
        TOTAL_COMPANY_POP_PER_STORE: 0,
        TOTAL_RESIDENT_POP_PER_STORE: 0
    
    }

      
    //지역의 상권이름 string[] 형태로 반환
    console.log(`상권이름 받아오는 중...`)
    const commercialDistrict_by_region : string[] = await getSanggwon_By_Region_commercial(auto,admin)    
    //상권별 유동인구
    console.log(`상권별 유동인구 받아오는 중...`)
    const seoulFloatingPopulation : getSeoulFloatingPopulation_Param[] = await getSeoulFloatingPopulation_hinterland()

    //상권별 직장인구
    console.log(`상권별 직장인구 받아오는 중...`)
    const seoulCompanyPopulation : getCompanyPopulation_Param[] = await getSeoulCompanyPopulation_hinterland()

    //상권별 상주인구
    console.log(`상권별 상주인구 받아오는 중...`)
    const seoulResidentPopulation : getResidentPopulation_Param[] = await getResidentPopulation_hinterland()

    //상권별 점포수 -> 업종별로 구분해야되는데.. 일단 전체 점포수 들고오자(리팩토링 대상)
    console.log(`상권별 점포수 받아오는 중...`)
    const seoulMarketCount_commercial : getSeoulMarketCount_Param[] = await getSeoulMarketCount_hinterland()
    //총 점포수 담을 변수
    let totalMarketCount1 : number = 0;
    let totalMarketCount2 : number = 0;


    //이건 금방됨 -> 알고리즘 리팩토링(리팩토링 대상)
    console.log(`지역과 ${name}상권의 총 유동인구 계산 중...`)

    for(let tmp1 of commercialDistrict_by_region){
        for(let tmp2 of seoulFloatingPopulation){
            if(tmp2.TRDAR_CD_NM	 === tmp1){
                ans1.TOTAL_FLOATING_POP_PER_STORE += tmp2.TOT_FLPOP_CO
            }
            if(tmp2.TRDAR_CD_NM === name){
                ans2.TOTAL_FLOATING_POP_PER_STORE = tmp2.TOT_FLPOP_CO
            }
            
        }
    }

    console.log(`지역 총 유동인구 : ${ans1.TOTAL_FLOATING_POP_PER_STORE}`)
    console.log(`${name} 상권 총 유동인구 : ${ans2.TOTAL_FLOATING_POP_PER_STORE}`)


    //이것도 금방됨 -> 알고리즘 리팩토링(리팩토링 대상)
    console.log(`지역과 ${name}상권의 총 직장인구 계산 중...`)

    for(let tmp1 of commercialDistrict_by_region){
        for(let tmp2 of seoulCompanyPopulation){
            if(tmp2.TRDAR_CD_NM	 === tmp1){
                ans1.TOTAL_COMPANY_POP_PER_STORE += tmp2.TOT_WRC_POPLTN_CO
            }
            if(tmp2.TRDAR_CD_NM === name){
                ans2.TOTAL_COMPANY_POP_PER_STORE = tmp2.TOT_WRC_POPLTN_CO
            }
        }
    }

    console.log(`지역 총 직장인구 : ${ans1.TOTAL_COMPANY_POP_PER_STORE}`)
    console.log(`${name} 상권 총 직장인구 : ${ans2.TOTAL_COMPANY_POP_PER_STORE}`)

    //이것도 금방됨 -> 알고리즘 리팩토링(리팩토링 대상)
    console.log(`지역과 ${name}상권의 총 상주인구 계산 중...`)

    for(let tmp1 of commercialDistrict_by_region){
        for(let tmp2 of seoulResidentPopulation){
            if(tmp2.TRDAR_CD_NM	 === tmp1){
                ans1.TOTAL_RESIDENT_POP_PER_STORE += tmp2.TOT_REPOP_CO
            }
            if(tmp2.TRDAR_CD_NM	 === name){
                ans2.TOTAL_RESIDENT_POP_PER_STORE = tmp2.TOT_REPOP_CO

            }
        }
    }
    console.log(`지역 총 상주인구 : ${ans1.TOTAL_COMPANY_POP_PER_STORE}`)
    console.log(`${name} 상권 총 상인구 : ${ans2.TOTAL_COMPANY_POP_PER_STORE}`)


    //여기가 개오래걸림
    console.log(`지역과 ${name}상권의 점포수 계산 중...`)

    for(let tmp1 of commercialDistrict_by_region){
        for(let tmp2 of seoulMarketCount_commercial){
            if(tmp2.TRDAR_CD_NM	 === tmp1){
                totalMarketCount1+= tmp2.STOR_CO
            }
            if(tmp2.TRDAR_CD_NM === name){
                totalMarketCount2 = tmp2.STOR_CO
            }
        }
    }

    ans1.TOTAL_FLOATING_POP_PER_STORE /= totalMarketCount1
    ans1.TOTAL_COMPANY_POP_PER_STORE /= totalMarketCount1
    ans1.TOTAL_RESIDENT_POP_PER_STORE /= totalMarketCount1
    
    ans2.TOTAL_FLOATING_POP_PER_STORE /= totalMarketCount2
    ans2.TOTAL_COMPANY_POP_PER_STORE /= totalMarketCount2
    ans2.TOTAL_RESIDENT_POP_PER_STORE /= totalMarketCount2
    
    //마지막 값 저장할 인터페이스 변수
    const ans3 : getTotalPopPerStore_Param = {
        TOTAL_FLOATING_POP_PER_STORE: ans2.TOTAL_FLOATING_POP_PER_STORE/ans1.TOTAL_FLOATING_POP_PER_STORE,
        TOTAL_COMPANY_POP_PER_STORE: ans2.TOTAL_COMPANY_POP_PER_STORE/ans1.TOTAL_COMPANY_POP_PER_STORE,
        TOTAL_RESIDENT_POP_PER_STORE: ans2.TOTAL_RESIDENT_POP_PER_STORE/ans1.TOTAL_RESIDENT_POP_PER_STORE
    }

    console.log(`지역 저장값 : ${JSON.stringify(ans1,null,2)}`)
    console.log(`${name} 상권 저장값 : ${JSON.stringify(ans2,null,2)}`)
    console.log(`마지막 저장값 ${JSON.stringify(ans3,null,2)}`)

    return ans3     
}

export async function calculateGrade(auto : string, admin : string, name : string) : Promise<Grade>{

    const tmp : getTotalPopPerStore_Param = await getSaturation(auto,admin,name)
    
    let ans : Grade = {
        float : "",
        company : "",
        resident : "",
    }

    ans.float = await judgeByCondition(tmp.TOTAL_FLOATING_POP_PER_STORE)
    ans.company = await judgeByCondition(tmp.TOTAL_COMPANY_POP_PER_STORE)
    ans.resident = await judgeByCondition(tmp.TOTAL_RESIDENT_POP_PER_STORE)

    console.log(ans.float)
    console.log(ans.company)
    console.log(ans.resident)
    
    return ans
}

export async function judgeByCondition(number : number) : Promise<string>{
    if(number > 1.3){
        return "유리"
    }else if(number >= 1.1 && number <= 1.3 ){
        return "적정"
    }else{
        return "불리"
    }
}
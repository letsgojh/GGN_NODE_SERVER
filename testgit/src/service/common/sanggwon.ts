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


import {
    getSanggwon_By_Region_commercial,
    getSanggwon_By_Region_hinterland,
    
} from '../convenient_store/service.js'

//하나의 상권에 대해 로직구현

//1. 인구수 포화도(점포 하나가 담당하는 평균 인구 수) 계산
//값이 높을수록 창업기회 크다, 낮을수록 경쟁심화 되어 작다
//높은 값일수록 잠재 고객층이 넓다, 낮을수록 적다

// 상권 하나의 총 유동인구(상권) / 점포수(상권하나)
// 상권 하나의 총 총 직장인구(상권) / 점포수(상권하나)
// 상권 하나의 총 총 상주인구(상권) / 점포수(상권하나) 반환
//name : 상권 하나의 이름

export async function getTotalPopPerStore_commercial_one_sanggwon(name : string) : Promise<getTotalPopPerStore_Param>{
    //상권별 유동인구
    const seoulFloatingPopulation : getSeoulFloatingPopulation_Param[] = await getSeoulFloatingPopulation_commercial()
    //상권 하나의 유동인구 수 담을 변수(일단 총 유동인구만)
    let totalFloatingPop : number = 0;

    //상권별 직장인구
    const seoulCompanyPopulation : getCompanyPopulation_Param[] = await getSeoulCompanyPopulation_commercial()
    //상권 하나의 총 직장인구 수 담을 변수(일단 총 직장인구만)
    let totalCompanyPop : number = 0;

    //상권별 상주인구
    const seoulResidentPopulation : getResidentPopulation_Param[] = await getResidentPopulation_commercial()
    //상권 하나의총 상주인구 수 담을 변수(일단 총 상주인구만)
    let totalResidentPop : number = 0;

    console.log(`${name}상권의 총 유동인구 계산 중...`)

    for(let tmp of seoulFloatingPopulation){
        if(tmp.TRDAR_CD_NM === name){
            totalFloatingPop = tmp.TOT_FLPOP_CO
            break
        }
    }

    console.log(`${name}상권의 총 직장인구 계산 중...`)

    for(let tmp of seoulCompanyPopulation){
        if(tmp.TRDAR_CD_NM === name){
            totalCompanyPop = tmp.TOT_WRC_POPLTN_CO
            break
        }
    }

    console.log(`${name}상권의 총 상주인구 계산 중...`)

    for(let tmp of seoulResidentPopulation){
        if(tmp.TRDAR_CD_NM === name){
            totalResidentPop = tmp.TOT_REPOP_CO
            break
        }
    }

    //상권별 점포수 -> 업종별로 구분해야되는데.. 일단 전체 점포수 들고오자(리팩토링 대상)
    const seoulMarketCount_commercial : getSeoulMarketCount_Param[] = await getSeoulMarketCount_commercial()
    //총 점포수 담을 변수
    let totalMarketCount : number = 0;

    console.log(`${name}상권의 점포수 계산 중...`)

    for(let tmp of seoulMarketCount_commercial){
        if(tmp.TRDAR_CD_NM === name){
            totalMarketCount = tmp.STOR_CO
            break
        }
    }

    const ans : getTotalPopPerStore_Param = {
        TOTAL_FLOATING_POP_PER_STORE: totalFloatingPop/totalMarketCount,
        TOTAL_COMPANY_POP_PER_STORE: totalCompanyPop/totalMarketCount,
        TOTAL_RESIDENT_POP_PER_STORE: totalResidentPop/totalMarketCount 
    }

    return ans

}



//1-2. 상권배후지(하나의 상권배후지)의 총 유동인구(상권배후지) / 점포수(상권배후지)

// 상권배후지(하나의 상권배후지)의 총 유동인구(상권배후지) / 점포수(상권배후지)
// 상권배후지(하나의 상권배후지)의 총 직장인구(상권배후지) / 점포수(상권배후지)
// 상권배후지(하나의 상권배후지)의 총 상주인구(상권배후지) / 점포수(상권배후지) 반환
//name : 상권 하나의 이름
export async function getTotalPopPerStore_hinterland_one_sanggwon(name : string) : Promise<getTotalPopPerStore_Param>{
     //상권별 유동인구
    const seoulFloatingPopulation : getSeoulFloatingPopulation_Param[] = await getSeoulFloatingPopulation_hinterland()
    //지역의 총 유동인구 수 담을 변수(일단 총 유동인구만)
    let totalFloatingPop : number = 0;

    //상권별 직장인구
    const seoulCompanyPopulation : getCompanyPopulation_Param[] = await getSeoulCompanyPopulation_hinterland()
    //지역의 총 직장인구 수 담을 변수(일단 총 직장인구만)
    let totalCompanyPop : number = 0;

    //상권별 상주인구
    const seoulResidentPopulation : getResidentPopulation_Param[] = await getResidentPopulation_hinterland()
    //지역의 총 상주인구 수 담을 변수(일단 총 상주인구만)
    let totalResidentPop : number = 0;

    console.log(`지역별 총 유동인구 계산 중...`)
    //시간복잡도.. 너무 오래걸림 -> 알고리즘 리팩토링(리팩토링 대상)
    for(let tmp2 of seoulFloatingPopulation){
        if(tmp2.TRDAR_CD_NM	 === name){
            totalFloatingPop = tmp2.TOT_FLPOP_CO
            break
        }
    }

    console.log(`지역별 총 직장인구 계산 중...`)

    //시간복잡도.. 너무 오래걸림 -> 알고리즘 리팩토링(리팩토링 대상)
    for(let tmp2 of seoulCompanyPopulation){
        if(tmp2.TRDAR_CD_NM	 === name){
            totalCompanyPop = tmp2.TOT_WRC_POPLTN_CO
            break
        }
    }
    
    console.log(`지역별 총 상주인구 계산 중...`)


        //시간복잡도.. 너무 오래걸림 -> 알고리즘 리팩토링(리팩토링 대상)
    for(let tmp2 of seoulResidentPopulation){
        if(tmp2.TRDAR_CD_NM	 === name){
            totalResidentPop = tmp2.TOT_REPOP_CO
            break
        }
    }



    //상권별 점포수 -> 업종별로 구분해야되는데.. 일단 전체 점포수 들고오자(리팩토링 대상)
    const seoulMarketCount_commercial : getSeoulMarketCount_Param[] = await getSeoulMarketCount_hinterland()
    //총 점포수 담을 변수
    let totalMarketCount : number = 0;
    console.log(`상권별 점포수 계산 중...`)

    for(let tmp of seoulMarketCount_commercial){
        if(tmp.TRDAR_CD_NM	 === name){
            totalMarketCount = tmp.STOR_CO
            break
        }
    }
    

    const ans : getTotalPopPerStore_Param = {
        TOTAL_FLOATING_POP_PER_STORE: totalFloatingPop/totalMarketCount,
        TOTAL_COMPANY_POP_PER_STORE: totalCompanyPop/totalMarketCount,
        TOTAL_RESIDENT_POP_PER_STORE: totalResidentPop/totalMarketCount 
    }

    return ans
}

//2-1. 인구수 대비 매출액(상권) 계산

//추정매출(상권하나) / 총 유동인구(상권하나)
//추정매출(상권하나) / 총 직장인구(상권하나)
//추정매출(상권하나) / 총 상주인구(상권하나)

export async function getPredictedIncomePerPop_commercial_one_sanggwon(name : string) : Promise<getPredictedIncomePerPop_Param>{
    //추정매출(상권)
    const predictedIncome : getSeoulEstimateIncome_Param[]= await getSeoulEstimateIncome_commercial()
    //당월 추정 매출 (업종 고려x)
    let totalIncome : number = 0
    //한 상권 유동인구
    const seoulFloatingPopulation : getSeoulFloatingPopulation_Param[] = await getSeoulFloatingPopulation_commercial()
    //상권의 총 유동인구 수 담을 변수(일단 총 유동인구만)
    let totalFloatingPop : number = 0;

    //한 상권 직장인구
    const seoulCompanyPopulation : getCompanyPopulation_Param[] = await getSeoulCompanyPopulation_commercial()
    //지역의 총 직장인구 수 담을 변수(일단 총 직장인구만)
    let totalCompanyPop : number = 0;

    //한 상권 상주인구
    const seoulResidentPopulation : getResidentPopulation_Param[] = await getResidentPopulation_commercial()
    //지역의 총 상주인구 수 담을 변수(일단 총 상주인구만)
    let totalResidentPop : number = 0;

    //시간복잡도.. 너무 오래걸림 -> 알고리즘 리팩토링(리팩토링 대상)
    for(let tmp of seoulFloatingPopulation){
        if(tmp.TRDAR_CD_NM === name){
            totalFloatingPop = tmp.TOT_FLPOP_CO
            break
        }
    }

    //시간복잡도.. 너무 오래걸림 -> 알고리즘 리팩토링(리팩토링 대상)
    for(let tmp of seoulCompanyPopulation){
        if(tmp.TRDAR_CD_NM	 === name){
            totalCompanyPop = tmp.TOT_WRC_POPLTN_CO
            break
        }
    }


    //시간복잡도.. 너무 오래걸림 -> 알고리즘 리팩토링(리팩토링 대상)
    for(let tmp of seoulResidentPopulation){
        if(tmp.TRDAR_CD_NM	=== name){
            totalResidentPop = tmp.TOT_REPOP_CO
            break
        }
    }



    //상권 하나의 총 매출 매핑 후 합 구하기
    for(let tmp of predictedIncome){
        if(tmp.TRDAR_CD_NM === name){
            totalIncome = tmp.THSMON_SELNG_AMT
            break
        }
    }


    const ans : getPredictedIncomePerPop_Param={
        PREDICTED_INCOME_PER_FLOATING_POP : totalIncome/totalFloatingPop,
        PREDICTED_INCOME_PER_COMPANY_POP : totalIncome/totalCompanyPop,
        PREDICTED_INCOME_PER_RESIDENT_POP : totalIncome/totalResidentPop,
    }


    return ans
}


//2-2. 상권배후지 하나의인구수 대비 매출액(상권배후지) 계산


//추정매출(상권배후지 하나) / 총 유동인구(상권배후지 하나)
//추정매출(상권배후지 하나) / 총 직장인구(상권배후지 하나)
//추정매출(상권배후지 하나) / 총 상주인구(상권배후지 하나)

export async function getPredictedIncomePerPop_hinterland_one_sanggwon(name : string) : Promise<getPredictedIncomePerPop_Param>{
    //추정매출(상권)
    const predictedIncome : getSeoulEstimateIncome_Param[]= await getSeoulEstimateIncome_hinterland()
    //당월 추정 매출 합(업종 고려x)
    let totalIncome : number = 0

    //상권별 유동인구
    const seoulFloatingPopulation : getSeoulFloatingPopulation_Param[] = await getSeoulFloatingPopulation_hinterland()
    //지역의 총 유동인구 수 담을 변수(일단 총 유동인구만)
    let totalFloatingPop : number = 0;

    //상권별 직장인구
    const seoulCompanyPopulation : getCompanyPopulation_Param[] = await getSeoulCompanyPopulation_hinterland()
    //지역의 총 직장인구 수 담을 변수(일단 총 직장인구만)
    let totalCompanyPop : number = 0;

    //상권별 상주인구
    const seoulResidentPopulation : getResidentPopulation_Param[] = await getResidentPopulation_hinterland()
    //지역의 총 상주인구 수 담을 변수(일단 총 상주인구만)
    let totalResidentPop : number = 0;

    //시간복잡도.. 너무 오래걸림 -> 알고리즘 리팩토링(리팩토링 대상)
    for(let tmp2 of seoulFloatingPopulation){
        if(tmp2.TRDAR_CD_NM	 === name){
            totalFloatingPop = tmp2.TOT_FLPOP_CO
            break
        }
    }


    //시간복잡도.. 너무 오래걸림 -> 알고리즘 리팩토링(리팩토링 대상)
    for(let tmp2 of seoulCompanyPopulation){
        if(tmp2.TRDAR_CD_NM	 === name){
            totalCompanyPop += tmp2.TOT_WRC_POPLTN_CO
            break
        }
    }


    //시간복잡도.. 너무 오래걸림 -> 알고리즘 리팩토링(리팩토링 대상)
    for(let tmp2 of seoulResidentPopulation){
        if(tmp2.TRDAR_CD_NM	 === name){
            totalResidentPop += tmp2.TOT_REPOP_CO
            break
        }
    }



//지역 총 매출 매핑 후 합 구하기
    for(let tmp2 of predictedIncome){
        if(tmp2.TRDAR_CD_NM === name){
            totalIncome += tmp2.THSMON_SELNG_AMT
            break
        }
    }


    const ans : getPredictedIncomePerPop_Param={
        PREDICTED_INCOME_PER_FLOATING_POP : totalIncome/totalFloatingPop,
        PREDICTED_INCOME_PER_COMPANY_POP : totalIncome/totalCompanyPop,
        PREDICTED_INCOME_PER_RESIDENT_POP : totalIncome/totalResidentPop,
    }


    return ans
}


// async function main() {
//     const res1 : getTotalPopPerStore_Param = await getTotalPopPerStore_commercial_one_sanggwon("자하문터널")
//     const res2 : getPredictedIncomePerPop_Param = await getPredictedIncomePerPop_commercial_one_sanggwon("자하문터널")
//     console.log(`자하문터널 인구포화도(상권) : ${JSON.stringify(res1,null,2)}`)
//     console.log(`자하문터널 인구수 대비 매출액(상권) : ${JSON.stringify(res2,null,2)}`)
// }
// main()

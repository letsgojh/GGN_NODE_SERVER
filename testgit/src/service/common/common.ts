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
} from '../../domain/populationDomain.ts'


import {
    getSanggwon_By_Region_commercial,
    getSanggwon_By_Region_hinterland,
    
} from '../convenient_store/service.js'
//공통으로 보낼 정보 구성


//1. 인구수 포화도(점포 하나가 담당하는 평균 인구 수) 계산
//값이 높을수록 창업기회 크다, 낮을수록 경쟁심화 되어 작다
//높은 값일수록 잠재 고객층이 넓다, 낮을수록 적다

// 지역의(행정구,자치동) 상권의 총 유동인구(상권) / 점포수(상권)
// 지역의(행정구,자치동) 상권의 총 직장인구(상권) / 점포수(상권)
// 지역의(행정구,자치동) 상권의 총 상주인구(상권) / 점포수(상권) 반환
export async function getTotalPopPerStore_commercial(auto : string,admin : string) : Promise<getTotalPopPerStore_Param>{
    //지역의 상권이름 string[] 형태로 반환
    const commercialDistrict_by_region : string[] = await getSanggwon_By_Region_commercial(auto,admin)    
    //상권별 유동인구
    const seoulFloatingPopulation : getSeoulFloatingPopulation_Param[] = await getSeoulFloatingPopulation_commercial()
    //지역의 총 유동인구 수 담을 변수(일단 총 유동인구만)
    let totalFloatingPop : number = 0;

    //상권별 직장인구
    const seoulCompanyPopulation : getCompanyPopulation_Param[] = await getSeoulCompanyPopulation_commercial()
    //지역의 총 직장인구 수 담을 변수(일단 총 직장인구만)
    let totalCompanyPop : number = 0;

    //상권별 상주인구
    const seoulResidentPopulation : getResidentPopulation_Param[] = await getResidentPopulation_commercial()
    //지역의 총 상주인구 수 담을 변수(일단 총 상주인구만)
    let totalResidentPop : number = 0;

    //시간복잡도.. 너무 오래걸림 -> 알고리즘 리팩토링(리팩토링 대상)
    console.log(`지역별 총 유동인구 계산 중...`)

    for(let tmp1 of commercialDistrict_by_region){
        for(let tmp2 of seoulFloatingPopulation){
            if(tmp2.TRDAR_CD_NM	 === tmp1){
                totalFloatingPop += tmp2.TOT_FLPOP_CO
            }
        }
    }

    //시간복잡도.. 너무 오래걸림 -> 알고리즘 리팩토링(리팩토링 대상)
    console.log(`지역별 총 직장인구 계산 중...`)

    for(let tmp1 of commercialDistrict_by_region){
        for(let tmp2 of seoulCompanyPopulation){
            if(tmp2.TRDAR_CD_NM	 === tmp1){
                totalCompanyPop += tmp2.TOT_WRC_POPLTN_CO
            }
        }
    }

        //시간복잡도.. 너무 오래걸림 -> 알고리즘 리팩토링(리팩토링 대상)
        console.log(`지역별 총 상주인구 계산 중...`)

    for(let tmp1 of commercialDistrict_by_region){
        for(let tmp2 of seoulResidentPopulation){
            if(tmp2.TRDAR_CD_NM	 === tmp1){
                totalResidentPop += tmp2.TOT_REPOP_CO
            }
        }
    }


    //상권별 점포수 -> 업종별로 구분해야되는데.. 일단 전체 점포수 들고오자(리팩토링 대상)
    const seoulMarketCount_commercial : getSeoulMarketCount_Param[] = await getSeoulMarketCount_commercial()
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

    const ans : getTotalPopPerStore_Param = {
        TOTAL_FLOATING_POP_PER_STORE: totalFloatingPop/totalMarketCount,
        TOTAL_COMPANY_POP_PER_STORE: totalCompanyPop/totalMarketCount,
        TOTAL_RESIDENT_POP_PER_STORE: totalResidentPop/totalMarketCount 
    }
    

    return ans    
}

//1-2. 지역의(행정구,자치동) 상권의 총 유동인구(상권배후지) / 점포수(상권배후지)

// 지역의(행정구,자치동) 상권의 총 유동인구(상권배후지) / 점포수(상권배후지)
// 지역의(행정구,자치동) 상권의 총 직장인구(상권배후지) / 점포수(상권배후지)
// 지역의(행정구,자치동) 상권의 총 상주인구(상권배후지) / 점포수(상권배후지) 반환
export async function getTotalPopPerStore_hinterland(auto : string,admin : string) : Promise<getTotalPopPerStore_Param>{
    //지역의 상권이름 string[] 형태로 반환
    const commercialDistrict_by_region : string[] = await getSanggwon_By_Region_hinterland(auto,admin)    
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
    for(let tmp1 of commercialDistrict_by_region){
        for(let tmp2 of seoulFloatingPopulation){
            if(tmp2.TRDAR_CD_NM	 === tmp1){
                totalFloatingPop += tmp2.TOT_FLPOP_CO
            }
        }
    }
    console.log(`지역별 총 직장인구 계산 중...`)

        //시간복잡도.. 너무 오래걸림 -> 알고리즘 리팩토링(리팩토링 대상)
    for(let tmp1 of commercialDistrict_by_region){
        for(let tmp2 of seoulCompanyPopulation){
            if(tmp2.TRDAR_CD_NM	 === tmp1){
                totalCompanyPop += tmp2.TOT_WRC_POPLTN_CO
            }
        }
    }
    console.log(`지역별 총 상주인구 계산 중...`)


        //시간복잡도.. 너무 오래걸림 -> 알고리즘 리팩토링(리팩토링 대상)
    for(let tmp1 of commercialDistrict_by_region){
        for(let tmp2 of seoulResidentPopulation){
            if(tmp2.TRDAR_CD_NM	 === tmp1){
                totalResidentPop += tmp2.TOT_REPOP_CO
            }
        }
    }


    //상권별 점포수 -> 업종별로 구분해야되는데.. 일단 전체 점포수 들고오자(리팩토링 대상)
    const seoulMarketCount_commercial : getSeoulMarketCount_Param[] = await getSeoulMarketCount_hinterland()
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

    const ans : getTotalPopPerStore_Param = {
        TOTAL_FLOATING_POP_PER_STORE: totalFloatingPop/totalMarketCount,
        TOTAL_COMPANY_POP_PER_STORE: totalCompanyPop/totalMarketCount,
        TOTAL_RESIDENT_POP_PER_STORE: totalResidentPop/totalMarketCount 
    }

    return ans
    
}

//2-1. 인구수 대비 매출액(상권) 계산
//1인당 매출(소비)액 : 크다면(인구는 많지 않아도 소비력이 큼), 작다면(인구는 많아도 실제 소비가 적음)
//추정매출(상권) / 총 유동인구(상권)
//추정매출(상권) / 총 직장인구(상권)
//추정매출(상권) / 총 상주인구(상권)


export async function getPredictedIncomePerPop_commercial(auto : string,admin : string) : Promise<getPredictedIncomePerPop_Param>{
    //추정매출(상권)
    const predictedIncome : getSeoulEstimateIncome_Param[]= await getSeoulEstimateIncome_commercial()
    //당월 추정 매출 합(업종 고려x)
    let totalIncome : number = 0

    //지역의 상권이름 string[] 형태로 반환
    const commercialDistrict_by_region : string[] = await getSanggwon_By_Region_commercial(auto,admin)    
    //상권별 유동인구
    const seoulFloatingPopulation : getSeoulFloatingPopulation_Param[] = await getSeoulFloatingPopulation_commercial()
    //지역의 총 유동인구 수 담을 변수(일단 총 유동인구만)
    let totalFloatingPop : number = 0;

    //상권별 직장인구
    const seoulCompanyPopulation : getCompanyPopulation_Param[] = await getSeoulCompanyPopulation_commercial()
    //지역의 총 직장인구 수 담을 변수(일단 총 직장인구만)
    let totalCompanyPop : number = 0;

    //상권별 상주인구
    const seoulResidentPopulation : getResidentPopulation_Param[] = await getResidentPopulation_commercial()
    //지역의 총 상주인구 수 담을 변수(일단 총 상주인구만)
    let totalResidentPop : number = 0;

    //시간복잡도.. 너무 오래걸림 -> 알고리즘 리팩토링(리팩토링 대상)
    for(let tmp1 of commercialDistrict_by_region){
        for(let tmp2 of seoulFloatingPopulation){
            if(tmp2.TRDAR_CD_NM	 === tmp1){
                totalFloatingPop += tmp2.TOT_FLPOP_CO
            }
        }
    }

    //시간복잡도.. 너무 오래걸림 -> 알고리즘 리팩토링(리팩토링 대상)
    for(let tmp1 of commercialDistrict_by_region){
        for(let tmp2 of seoulCompanyPopulation){
            if(tmp2.TRDAR_CD_NM	 === tmp1){
                totalCompanyPop += tmp2.TOT_WRC_POPLTN_CO
            }
        }
    }

    //시간복잡도.. 너무 오래걸림 -> 알고리즘 리팩토링(리팩토링 대상)
    for(let tmp1 of commercialDistrict_by_region){
        for(let tmp2 of seoulResidentPopulation){
            if(tmp2.TRDAR_CD_NM	 === tmp1){
                totalResidentPop += tmp2.TOT_REPOP_CO
            }
        }
    }


    //지역 총 매출 매핑 후 합 구하기
    for(let tmp1 of commercialDistrict_by_region){
        for(let tmp2 of predictedIncome){
            if(tmp2.TRDAR_CD_NM === tmp1){
                totalIncome += tmp2.THSMON_SELNG_AMT
            }
        }
    }

    const ans : getPredictedIncomePerPop_Param={
        PREDICTED_INCOME_PER_FLOATING_POP : totalIncome/totalFloatingPop,
        PREDICTED_INCOME_PER_COMPANY_POP : totalIncome/totalCompanyPop,
        PREDICTED_INCOME_PER_RESIDENT_POP : totalIncome/totalResidentPop,
    }


    return ans
}


//2-2. 인구수 대비 매출액(상권배후지) 계산


//추정매출(상권배후지) / 총 유동인구(상권배후지)
//추정매출(상권배후지) / 총 직장인구(상권배후지)
//추정매출(상권배후지) / 총 상주인구(상권배후지)

export async function getPredictedIncomePerPop_hinterland(auto : string,admin : string) : Promise<getPredictedIncomePerPop_Param>{
    //추정매출(상권)
    const predictedIncome : getSeoulEstimateIncome_Param[]= await getSeoulEstimateIncome_commercial()
    //당월 추정 매출 합(업종 고려x)
    let totalIncome : number = 0

    //지역의 상권이름 string[] 형태로 반환
    const commercialDistrict_by_region : string[] = await getSanggwon_By_Region_hinterland(auto,admin)    
    //상권별 유동인구
    const seoulFloatingPopulation : getSeoulFloatingPopulation_Param[] = await getSeoulFloatingPopulation_commercial()
    //지역의 총 유동인구 수 담을 변수(일단 총 유동인구만)
    let totalFloatingPop : number = 0;

    //상권별 직장인구
    const seoulCompanyPopulation : getCompanyPopulation_Param[] = await getSeoulCompanyPopulation_commercial()
    //지역의 총 직장인구 수 담을 변수(일단 총 직장인구만)
    let totalCompanyPop : number = 0;

    //상권별 상주인구
    const seoulResidentPopulation : getResidentPopulation_Param[] = await getResidentPopulation_commercial()
    //지역의 총 상주인구 수 담을 변수(일단 총 상주인구만)
    let totalResidentPop : number = 0;

    //시간복잡도.. 너무 오래걸림 -> 알고리즘 리팩토링(리팩토링 대상)
    for(let tmp1 of commercialDistrict_by_region){
        for(let tmp2 of seoulFloatingPopulation){
            if(tmp2.TRDAR_CD_NM	 === tmp1){
                totalFloatingPop += tmp2.TOT_FLPOP_CO
            }
        }
    }

        //시간복잡도.. 너무 오래걸림 -> 알고리즘 리팩토링(리팩토링 대상)
    for(let tmp1 of commercialDistrict_by_region){
        for(let tmp2 of seoulCompanyPopulation){
            if(tmp2.TRDAR_CD_NM	 === tmp1){
                totalCompanyPop += tmp2.TOT_WRC_POPLTN_CO
            }
        }
    }

        //시간복잡도.. 너무 오래걸림 -> 알고리즘 리팩토링(리팩토링 대상)
    for(let tmp1 of commercialDistrict_by_region){
        for(let tmp2 of seoulResidentPopulation){
            if(tmp2.TRDAR_CD_NM	 === tmp1){
                totalResidentPop += tmp2.TOT_REPOP_CO
            }
        }
    }


    //지역 총 매출 매핑 후 합 구하기
    for(let tmp1 of commercialDistrict_by_region){
        for(let tmp2 of predictedIncome){
            if(tmp2.TRDAR_CD_NM === tmp1){
                totalIncome += tmp2.THSMON_SELNG_AMT
            }
        }
    }

    const ans : getPredictedIncomePerPop_Param={
        PREDICTED_INCOME_PER_FLOATING_POP : totalIncome/totalFloatingPop,
        PREDICTED_INCOME_PER_COMPANY_POP : totalIncome/totalCompanyPop,
        PREDICTED_INCOME_PER_RESIDENT_POP : totalIncome/totalResidentPop,
    }


    return ans
}
/*
async function main(){
    const res1 : getTotalPopPerStore_Param = await getTotalPopPerStore_commercial("종로구","청운효자동")
    //const res2 : getTotalPopPerStore_Param = await getTotalPopPerStore_hinterland("종로구","청운효자동")
    //const res3 :getPredictedIncomePerPop_Param = await getPredictedIncomePerPop_commercial("종로구","청운효자동")
    //const res4 :getPredictedIncomePerPop_Param = await getPredictedIncomePerPop_hinterland("종로구","청운효자동")
    
    console.log(`종로구 청운효자동 인구포화도(상권) : ${JSON.stringify(res1,null,2)}`)
    //console.log(`종로구 청운효자동 인구포화도(상권배후지) : ${JSON.stringify(res2,null,2)}`)
    //console.log(`종로구 청운효자동 인구수대비 추정매출(상권) : ${JSON.stringify(res3,null,2)}`)
    //console.log(`종로구 청운효자동 인구수대비 추정매출(상권배후지) : ${JSON.stringify(res4,null,2)}`)
    
}

main()
*/
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
    getPredictedIncomePerPop_Param,
    getPredictedIncomePerRent_Param,
    getSeoulEstimateIncome_district_Param
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
    getSeoulEstimateIncome_district,
} from '../../domain/domain.ts'


import {
    getSanggwon_By_Region_commercial,
    getSanggwon_By_Region_hinterland,
    
} from '../convenient_store/service.ts'
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
//3. 상권별 임대료 대비 추정매출 비율 계산
// 월세만 계산
// (평당 임대료 / 당월 매출액[해당 구동 매출액 합 다 구해서 평균 구한 것])
// gu === 자치구 코드명(종로구))
export async function getPredictedIncomePerLent_commercial(gu: string) : Promise<getPredictedIncomePerRent_Param>{
    console.log(gu);
    const lentMap = new Map<string, number>();
    console.log("임대료 불러오는중");
    const lentList : getSeoulStorePrice_Param[] = await getSeoulStorePrice();
    console.log("추정매출액 불러오는중");
    const incomeList : getSeoulEstimateIncome_district_Param[] = await getSeoulEstimateIncome_district();
    const incomeMap=new Map<string, number>();
    const incomeMapPlusCount = new Map<String,number>();
    const regionMap = new Map<string,string>();
    let oneLentPerPredictedIncome: number = 0;
    let totalLentPerPredictedIncome : number =0;
    let count = 0;
    // lentList[자치구 코드] = 평당 임대료(월세만 계산)
    for(let lentItem of lentList){
        if(lentItem.RENT_SE ==="전세"){
            continue;
        }
        if(!lentMap.has(lentItem.CGG_CD)){
            lentMap.set(lentItem.CGG_CD, lentItem.RTFE/lentItem.RENT_AREA);
        }
        else{
            lentMap.set(lentItem.CGG_CD, lentMap.get(lentItem.CGG_CD)! + lentItem.RTFE/lentItem.RENT_AREA);
        }
    }
    // incomeMap[자치구 코드] = 해당 자치구 추정 매출의 합
    // incomeMapPlusCount[자치구 코드] = 해당 자치구 추정 매출의 합 더한 횟수(평균구하기 위해서 만든 맵)
    for(let incomeItem of incomeList){
        if(!incomeMap.has(incomeItem.SIGNGU_CD)){
            regionMap.set(incomeItem.SIGNGU_CD, incomeItem.SIGNGU_CD_NM);
            incomeMap.set(incomeItem.SIGNGU_CD, incomeItem.THSMON_SELNG_AMT);
            incomeMapPlusCount.set(incomeItem.SIGNGU_CD,1);
        }
        else{
            incomeMap.set(incomeItem.SIGNGU_CD, incomeMap.get(incomeItem.SIGNGU_CD)?? 0 + incomeItem.THSMON_SELNG_AMT);
            incomeMapPlusCount.set(incomeItem.SIGNGU_CD,incomeMapPlusCount.get(incomeItem.SIGNGU_CD)??0+1);
        }
    }
    /**
     * 1. 해당 자치구 매출액 평균 구하기
     * 2. 헤딩자치구 해당 자치구 매출액 평균 / 평당 임대료 을 lentMap에 넣음
     * 3. 하나의 자치구 매출액 / 임대료 을 저장하기
     * 4. totalLentPerPredictedIncome 에다가 다 더한 후 더한 횟수만큼 나누기
     */
    console.dir(incomeMap.keys());
    for(let key of incomeMap.keys()){
        incomeMap.set(key, (incomeMap.get(key) ?? 0) / (incomeMapPlusCount.get(key) ?? 1));
        lentMap.set(key,(incomeMap.get(key)??0)/(lentMap.get(key)??0))
        count++;
        if(regionMap.get(key) === gu){
            oneLentPerPredictedIncome=lentMap.get(key)??0;
        }
        totalLentPerPredictedIncome+= lentMap.get(key)??0;
    }

    totalLentPerPredictedIncome/=count;
    

    const ans : getPredictedIncomePerRent_Param = {
        PREDICTED_INCOME_PER_RENT : oneLentPerPredictedIncome/totalLentPerPredictedIncome
    }

    return ans;

}



/*
// async function main(){
//     const res1 : getTotalPopPerStore_Param = await getTotalPopPerStore_commercial("종로구","청운효자동")
//     const res2 : getTotalPopPerStore_Param = await getTotalPopPerStore_hinterland("종로구","청운효자동")
//     const res3 :getPredictedIncomePerPop_Param = await getPredictedIncomePerPop_commercial("종로구","청운효자동")
//     const res4 :getPredictedIncomePerPop_Param = await getPredictedIncomePerPop_hinterland("종로구","청운효자동")

//     console.log(`종로구 청운효자동 인구포화도(상권) : ${JSON.stringify(res1,null,2)}`)
//     console.log(`종로구 청운효자동 인구포화도(상권배후지) : ${JSON.stringify(res2,null,2)}`)
//     console.log(`종로구 청운효자동 인구수대비 추정매출(상권) : ${JSON.stringify(res3,null,2)}`)
//     console.log(`종로구 청운효자동 인구수대비 추정매출(상권배후지) : ${JSON.stringify(res4,null,2)}`)
    
// }

// main()
*/

// 테스트 코드( 예상매출액 / 평당 임대료 )
async function main(){
    console.log("test code");
    const res :getPredictedIncomePerRent_Param = await getPredictedIncomePerLent_commercial("종로구");
    console.log(res);
}

main();

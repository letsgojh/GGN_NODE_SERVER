import {
    getSeoulFloatingPopulation_Param,
    getCompanyPopulation_Param,
    getResidentPopulation_Param,
    getSeoulMarketCount_Param,
    getSeoulEstimateIncome_Param,
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
} from '../../domain/calledData.ts'
import { getFloatingPop_commercial } from '../../domain/population/floatingPop.ts';
import { getCompanyPop_commercial } from '../../domain/population/companyPop.ts';
import { getResidentPop_commercial } from '../../domain/population/residentPop.ts';
import { getMarketCountCommercial } from '../../domain/marketcount/marketCount.ts';
//하나의 상권에 대해 로직구현

//1. 인구수 포화도(점포 하나가 담당하는 평균 인구 수) 계산
//값이 높을수록 창업기회 크다, 낮을수록 경쟁심화 되어 작다
//높은 값일수록 잠재 고객층이 넓다, 낮을수록 적다

// 상권 하나의 총 유동인구(상권) / 점포수(상권하나)
// 상권 하나의 총 총 직장인구(상권) / 점포수(상권하나)
// 상권 하나의 총 총 상주인구(상권) / 점포수(상권하나) 반환
//name : 상권 하나의 이름

export async function getSaturation(gu: string, dong: string, name : string, indsutry: string):Promise<getTotalPopPerStore_Param>{
    const districtName = `${gu} ${dong}`;
    console.log(districtName);
    const commercialName = name;
    const seoulFloatingPopulation = await getFloatingPop_commercial();
    const seoulCompanyPopulation = await getCompanyPop_commercial();
    const seoulResidentPopulation = await getResidentPop_commercial();
    const storeCount =(await getMarketCountCommercial()).get(districtName);
    let totalStore_Dong = 0;
    const oneIncome_commercial = storeCount?.get(commercialName)?.get("total");
    const totalCompanyPop = seoulCompanyPopulation.get(districtName)?.get("total");
    const totalResidentPop = seoulResidentPopulation.get(districtName)?.get("total");
    const totalFloatingPop = seoulFloatingPopulation.get(districtName)?.get("total");
    const oneCompanyPop =seoulCompanyPopulation.get(districtName)?.get(commercialName)||0;
    const oneResidentPop=seoulResidentPopulation.get(districtName)?.get(commercialName)||0;
    const oneFloatingPop =seoulFloatingPopulation.get(districtName)?.get(commercialName)||0;

    for(let commercial of storeCount!.keys()){
        totalStore_Dong += (storeCount!.get(commercial)?.get("total") || 0);
    }
    const ans: getTotalPopPerStore_Param={
        TOTAL_COMPANY_POP_PER_STORE: (oneIncome_commercial!/oneCompanyPop)/(totalStore_Dong/totalCompanyPop!),
        TOTAL_FLOATING_POP_PER_STORE: (oneIncome_commercial!/oneFloatingPop)/(totalStore_Dong/totalFloatingPop!),
        TOTAL_RESIDENT_POP_PER_STORE: (oneIncome_commercial!/oneResidentPop)/(totalStore_Dong/totalResidentPop!)
    }
    return ans;
    
}


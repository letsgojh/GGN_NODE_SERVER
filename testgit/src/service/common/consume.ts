import { getEstimatedIncomeCommercial } from '../../domain/income/income.ts';
import { getCompanyPop_commercial } from '../../domain/population/companyPop.ts';
import { getFloatingPop_commercial }from '../../domain/population/floatingPop.ts'
import { getResidentPop_commercial } from '../../domain/population/residentPop.ts';
import {
    getTotalPopPerStore_Param,
} from '../../domain/types.ts'

export async function getConsume(auto : string, admin : string, name : string) : Promise<getTotalPopPerStore_Param>{
    const districtName = `${auto} ${admin}`;
    const commercialName = name;
    const seoulFloatingPopulation = await getFloatingPop_commercial();
    const seoulCompanyPopulation = await getCompanyPop_commercial();
    const seoulResidentPopulation = await getResidentPop_commercial();
    const predictedIncome =(await getEstimatedIncomeCommercial()).get(districtName);
    console.log(predictedIncome);
    let totalIncome_Dong = 0;
    const oneIncome_commercial = predictedIncome?.get(commercialName)?.get("total");
    const totalCompanyPop = seoulCompanyPopulation.get(districtName)?.get("total");
    const totalResidentPop = seoulResidentPopulation.get(districtName)?.get("total");
    const totalFloatingPop = seoulFloatingPopulation.get(districtName)?.get("total");
    const oneCompanyPop =seoulCompanyPopulation.get(districtName)?.get(commercialName)||0;
    const oneResidentPop=seoulResidentPopulation.get(districtName)?.get(commercialName)||0;
    const oneFloatingPop =seoulFloatingPopulation.get(districtName)?.get(commercialName)||0;

    for(let commercial of predictedIncome!.keys()){
        totalIncome_Dong += (predictedIncome!.get(commercial)?.get("total") || 0);
    }
    const ans: getTotalPopPerStore_Param={
        TOTAL_COMPANY_POP_PER_STORE: (oneIncome_commercial!/oneCompanyPop)/(totalIncome_Dong/totalCompanyPop!),
        TOTAL_FLOATING_POP_PER_STORE: (oneIncome_commercial!/oneFloatingPop)/(totalIncome_Dong/totalFloatingPop!),
        TOTAL_RESIDENT_POP_PER_STORE: (oneIncome_commercial!/oneResidentPop)/(totalIncome_Dong/totalResidentPop!)
    }
    return ans;

}
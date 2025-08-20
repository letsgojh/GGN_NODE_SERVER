import{
  getPredictedIncome_gu,
  getRent
}from '../../domain/rent/rent.ts';
import { getPredictedIncomePerRent_Param } from '../../domain/types.ts';
import { calculateGrade_Income } from './calculateGrade.ts';

export async function IncomePerRentService(gu:string) :Promise<getPredictedIncomePerRent_Param>{
  
  /**
   * 2. 자치구 해당 자치구 매출액 평균 / 평당 임대료 을 RentMap에 넣음
   * 3. 하나의 자치구 매출액 / 임대료 을 저장하기
   * 4. totalRentPerPredictedIncome 에다가 다 더한 후 더한 횟수만큼 나누기
  */

    const incomeMap = await getPredictedIncome_gu(); //추정매출 
    const RentMap = await getRent(); //평당 임대료 
    let oneRentPerPredictedIncome: number = 0;
    let totalRentPerPredictedIncome : number =0;
    let count = 0;
  for(let key of incomeMap.keys()){
    RentMap.set(key,(incomeMap.get(key)??0)/(RentMap.get(key)??0))
    count++;
    if(key===gu){
      oneRentPerPredictedIncome=RentMap.get(key)??0;
      }
      totalRentPerPredictedIncome+= RentMap.get(key)??0;
    }
    
    totalRentPerPredictedIncome/=count;
    const ans={
      PREDICTED_INCOME_PER_RENT: oneRentPerPredictedIncome/totalRentPerPredictedIncome
    }
    return ans;
}

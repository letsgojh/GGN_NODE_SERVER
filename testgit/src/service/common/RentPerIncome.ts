  import{
    getPredictedIncome_gu,
    getRent
  }from '../../domain/rent/rent.ts';
  
  
  export async function IncomePerRentService(gu:string) :Promise<number>{
    
    /**
     * 1. 해당 자치구 매출액 평균 구하기
     * 2. 헤딩자치구 해당 자치구 매출액 평균 / 평당 임대료 을 RentMap에 넣음
     * 3. 하나의 자치구 매출액 / 임대료 을 저장하기
     * 4. totalRentPerPredictedIncome 에다가 다 더한 후 더한 횟수만큼 나누기
    */
  
      const incomeMap = await getPredictedIncome_gu();
      const RentMap = await getRent();
      let oneRentPerPredictedIncome: number = 0;
      let totalRentPerPredictedIncome : number =0;
      let count = 0;
    for(let key of incomeMap.keys()){
      RentMap.set(key,(incomeMap.get(key)??0)/(RentMap.get(key)??0))
      count++;
      if(key=== gu){
        oneRentPerPredictedIncome=RentMap.get(key)??0;
        }
        totalRentPerPredictedIncome+= RentMap.get(key)??0;
      }
      
      totalRentPerPredictedIncome/=count;
      const ans = oneRentPerPredictedIncome/totalRentPerPredictedIncome;
      return ans;
  }
  
  async function main(){
    const res = await IncomePerRentService("종로구");
    console.log(IncomePerRentService("종로구"));
  }
  
  main();
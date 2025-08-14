
import dotenv from "dotenv"
import { getSeoulFloatingPopulationParam,
    getSeoulMarketCount_Param,
    getSeoulCompanyPopulation_Param,
    getSeoulEstimateIncome_Param,
    getSeoulCommercialDistrict_Param
} from '../service/convinient_store/types.js'

dotenv.config()

//api 1회 호출시 최대 1000건만 요청 가능 -> chunk 를 1000으로 지정


//서울특별시 유동인구수를 가져오는 메서드
//잠재 고객 규모 파악에 사용
export async function getSeoulFloatingPopulation() : Promise<getSeoulFloatingPopulationParam[]>{
    let startIndex : number= 1
    let endIndex : number= 1000
    let cnt : number= 0;

    let url : string= `http://openapi.seoul.go.kr:8088/${process.env.FLOATING_POPULATION_API_KEY}/json/VwsmTrdarFlpopQq/${startIndex}/${endIndex}/20241`
    let tmp : any= await fetch(url).then((response)=>{
            return response.json()
        })

    const totalCount : string= tmp.VwsmTrdarFlpopQq.list_total_count
    const result : getSeoulFloatingPopulationParam[] = []


    while(true){
        url = `http://openapi.seoul.go.kr:8088/${process.env.FLOATING_POPULATION_API_KEY}/json/VwsmTrdarFlpopQq/${startIndex}/${endIndex}/20241`
        const res : any= await fetch(url).then((response)=>{
            return response.json()
        }).catch((error)=>{
            console.error(`${startIndex} ~ ${endIndex} 에서 ${error}에러`)
            res = null;
        }

        if (!res ||!res.VwsmTrdarFlpopQq ||(res.VwsmTrdarFlpopQq.RESULT && res.VwsmTrdarFlpopQq.RESULT.CODE === 'INFO-200')) {
            console.log(`데이터 없음 → 반복 종료 `);
            break;
        }

        cnt++
        console.log(`${totalCount} 개 중에 ${cnt}개 완료`)

        for(let tmp of res.VwsmTrdarFlpopQq.row){
            result.push(tmp)
        }

      
        startIndex+=1000
        endIndex+=1000
    }

    console.log(`서울시 유동인구 api 사용`)
    console.log(`total Data Length of 서울특별시 유동인구: ${result.length}`)
    console.dir(result,{depth : null})
    return result
}

//서울특별시 직장인구(상권)을 가져오는 메서드
//낮 시간대 소비층 규모 파악
export async function getSeoulCompanyPopulation_commercial(): Promise<getSeoulCompanyPopulation_Param[]>{
    let startIndex = 1
    let endIndex = 1000
    let cnt : number = 0
    let url = `http://openapi.seoul.go.kr:8088/${process.env.COMPANY_POPULATION_COMMERCIAL_API_KEY}/json/VwsmTrdarWrcPopltnQq/${startIndex}/${endIndex}/`
    let tmp = await fetch(url).then((response)=>{
            return response.json()
        })

    const totalCount = tmp.VwsmTrdarWrcPopltnQq.list_total_count
    const result : getSeoulCompanyPopulation_Param[] = []


    while(true){
        url = `http://openapi.seoul.go.kr:8088/${process.env.COMPANY_POPULATION_COMMERCIAL_API_KEY}/json/VwsmTrdarWrcPopltnQq/${startIndex}/${endIndex}/`
        const res = await fetch(url).then((response)=>{
            return response.json()
        }).catch((error)=>{
            console.error(`${startIndex} ~ ${endIndex} 에서 ${error}에러`)
            return []
        })

        if (!res || (res.RESULT && res.RESULT.CODE === 'INFO-200')) {
            console.log(`데이터 없음 → 반복 종료 (Data Lenghth : ${totalCount})`);
            break;
        }

        
        for(let tmp of res.VwsmTrdarWrcPopltnQq.row){
            result.push(tmp)
        }

        cnt++
        console.log(`${totalCount} 개 중에 ${cnt*1000}개 완료`)
      
        startIndex+=1000
        endIndex+=1000
    }

    console.log(`서울시 직장인구-상권 api 사용`)
    console.log(`total Data Length of 서울시 직장인구(상권): ${result.length}`)
    //console.dir(result,{depth : null})
    return result
}

//서울특별시 직장인구(상권 배후지)을 가져오는 메서드
//낮 시간대 소비층 규모 파악
export async function getSeoulCompanyPopulation_hinterland() : Promise<getSeoulCompanyPopulation_Param[]>{
    let startIndex : number = 1
    let endIndex : number = 1000
    let cnt : number = 0
    let url = `http://openapi.seoul.go.kr:8088/${process.env.COMPANY_POPULATION_HINTERLAND_API_KEY}/json/Vwsm_TrdhlWrcPopltnQq/${startIndex}/${endIndex}/`
    let tmp = await fetch(url).then((response)=>{
            return response.json()
        })

    const totalCount = tmp.Vwsm_TrdhlWrcPopltnQq.list_total_count
    const result : getSeoulCompanyPopulation_Param[] = []


    while(true){
        url = `http://openapi.seoul.go.kr:8088/${process.env.COMPANY_POPULATION_HINTERLAND_API_KEY}/json/Vwsm_TrdhlWrcPopltnQq/${startIndex}/${endIndex}/`
        const res = await fetch(url).then((response)=>{
            return response.json()
        }).catch((error)=>{
            console.error(`${startIndex} ~ ${endIndex} 에서 ${error}에러`)
            return []
        })

        if (!res || (res.RESULT && res.RESULT.CODE === 'INFO-200')) {
            console.log(`데이터 없음 → 반복 종료 (Data Lenghth : ${totalCount})`);
            break;
        }

        
        for(let tmp of res.Vwsm_TrdhlWrcPopltnQq.row){
            result.push(tmp)
        }

        cnt++
        console.log(`${totalCount} 개 중에 ${cnt*1000}개 완료`)
        
      
        startIndex+=1000
        endIndex+=1000
    }

    console.log(`서울시 직장인구(상권배후지) api 사용`)
    console.log(`total Data Length of 서울시 직장인구(상권배후지): ${result.length}`)
    return result
}

//서울특별시 점포 수(상권)을 가져오는 메서드
//동일 업종 점포수(경쟁 강도) 파악

export async function getSeoulMarketCount_commercial(): Promise<getSeoulMarketCount_Param[]>{
    let startIndex = 1
    let endIndex = 1000
    let cnt = 0;
    let url = `http://openapi.seoul.go.kr:8088/${process.env.MARKET_COUNT_COMMERCIAL_API_KEY}/json/VwsmTrdarStorQq/${startIndex}/${endIndex}/20241`

    let tmp = await fetch(url).then((response)=>{
            return response.json()
        })

    const totalCount = tmp.VwsmTrdarStorQq.list_total_count
    const result : getSeoulMarketCount_Param[] = []


    while(true){
        url = `http://openapi.seoul.go.kr:8088/${process.env.MARKET_COUNT_COMMERCIAL_API_KEY}/json/VwsmTrdarStorQq/${startIndex}/${endIndex}/20241`
        const res = await fetch(url).then((response)=>{
            return response.json()
        }).catch((error)=>{
            console.error(`${startIndex} ~ ${endIndex} 에서 ${error}에러`)
            return []
        })

        if (!res || (res.RESULT && res.RESULT.CODE === 'INFO-200')) {
            console.log(`데이터 없음 → 반복 종료 `);
            break;
        }

        cnt++
        console.log(`${totalCount} 개 중에 ${cnt*1000}개 완료`)
        
        for(let tmp of res.VwsmTrdarStorQq.row){
            result.push(tmp)
        }
      
        startIndex+=1000
        endIndex+=1000
    }

    console.log(`서울시 점포 수(상권) api 사용`)
    console.log(`total Data Length of 서울시 점포 수(상권): ${result.length}`)
    return result
}

//서울특별시 점포 수(상권배후지)을 가져오는 메서드
//동일 업종 점포수(경쟁 강도) 파악
export async function getSeoulMarketCount_hinterland() : Promise<getSeoulMarketCount_Param[]>{
    let startIndex : number = 1
    let endIndex : number = 1000
    let cnt : number = 0
    let url : string = `http://openapi.seoul.go.kr:8088/${process.env.MARKET_COUNT_HINTERLAND_API_KEY}/json/VwsmTrdhlStorQq/${startIndex}/${endIndex}/`
 
    let tmp = await fetch(url).then((response)=>{
            return response.json()
        })

    const totalCount = tmp.VwsmTrdhlStorQq.list_total_count
    const result : getSeoulMarketCount_Param[] = []


    while(true){
        url = `http://openapi.seoul.go.kr:8088/${process.env.MARKET_COUNT_HINTERLAND_API_KEY}/json/VwsmTrdhlStorQq/${startIndex}/${endIndex}/`
        const res = await fetch(url).then((response)=>{
            return response.json()
        }).catch((error)=>{
            console.error(`${startIndex} ~ ${endIndex} 에서 ${error}에러`)
            return []
        })

        if (!res || (res.RESULT && res.RESULT.CODE === 'INFO-200')) {
            console.log(`데이터 없음 → 반복 종료`);
            break;
        }

        
        for(let tmp of res.VwsmTrdhlStorQq.row){
            result.push(tmp)
        }

        cnt++;
        console.log(`${totalCount} 개 중에 ${cnt*1000}개 완료`)
      
        startIndex+=1000
        endIndex+=1000
    }

    console.log(`서울시 점포 수(상권배후지) api 사용`)
    console.log(`total Data Length of 서울시 점포 수(상권배후지): ${result.length}`)
    return result
}

//서울특별시 추정매출(상권)을 가져오는 메서드
//경쟁 대비 시장의 규모를 알려준다.
export async function getSeoulEstimateIncome_commercial() : Promise<getSeoulEstimateIncome_Param[]>{
    let startIndex = 1
    let endIndex = 1000
    let cnt : number = 0
    let url = `http://openapi.seoul.go.kr:8088/${process.env.ESTIMATE_INCOME_COMMERCIAL_API_KEY}/json/VwsmTrdarSelngQq/${startIndex}/${endIndex}/20241`

    let tmp = await fetch(url).then((response)=>{
            return response.json()
        })

    const totalCount = tmp.VwsmTrdarSelngQq.list_total_count
    const result : getSeoulEstimateIncome_Param[] = []


    while(true){
        url = `http://openapi.seoul.go.kr:8088/${process.env.ESTIMATE_INCOME_COMMERCIAL_API_KEY}/json/VwsmTrdarSelngQq/${startIndex}/${endIndex}/20241`
        const res = await fetch(url).then((response)=>{
            return response.json()
        }).catch((error)=>{
            console.error(`${startIndex} ~ ${endIndex} 에서 ${error}에러`)
            return []
        })

        if (!res || (res.RESULT && res.RESULT.CODE === 'INFO-200')) {
            console.log(`데이터 없음 → 반복 종료 (Data Lenghth : ${totalCount})`);
            break;
        }

        
        for(let tmp of res.VwsmTrdarSelngQq.row){
            result.push(tmp)
        }

        cnt++
        console.log(`${totalCount} 개 중에 ${cnt*1000}개 완료`)
      
        startIndex+=1000
        endIndex+=1000
    }

    console.log(`서울시 추정 매출(상권) api 사용`)
    console.log(`total Data Length of 서울시 추정 매출(상권): ${result.length}`)
    return result
}

//서울특별시 추정매출(상권 배후지)를 가져오는 메서드
//경쟁 대비 시장의 규모를 알려준다.
export async function getSeoulEstimateIncome_hinterland() : Promise<getSeoulEstimateIncome_Param[]>{
    let startIndex = 1
    let endIndex = 1000
    let cnt : number = 0
    let url = `http://openapi.seoul.go.kr:8088/${process.env.ESTIMATE_INCOME_HINTERLAND_API_KEY}/json/VwsmTrdhlSelngQq/${startIndex}/${endIndex}/`

    let tmp = await fetch(url).then((response)=>{
            return response.json()
        })

    const totalCount = tmp.VwsmTrdhlSelngQq.list_total_count
    const result : getSeoulEstimateIncome_Param[] = []


    while(true){
        url = `http://openapi.seoul.go.kr:8088/${process.env.ESTIMATE_INCOME_HINTERLAND_API_KEY}/json/VwsmTrdhlSelngQq/${startIndex}/${endIndex}/`
        const res = await fetch(url).then((response)=>{
            return response.json()
        }).catch((error)=>{
            console.error(`${startIndex} ~ ${endIndex} 에서 ${error}에러`)
            return []
        })

        if (!res || (res.RESULT && res.RESULT.CODE === 'INFO-200')) {
            console.log(`데이터 없음 → 반복 종료 (Data Lenghth : ${totalCount})`);
            break;
        }

        
        for(let tmp of res.VwsmTrdhlSelngQq.row){
            result.push(tmp)
        }

        cnt++
        console.log(`${totalCount} 개 중에 ${cnt*1000}개 완료`)
      
        startIndex+=1000
        endIndex+=1000
    }

    console.log(`서울시 추정 매출(상권배후지) api 사용`)
    console.log(`total Data Length of 서울시 추정 매출(상권배후지): ${result.length}`)
    return result
}

//서울특별시 영역에 따른 상권을 가져오는 메서드
//특정영역에 존재하는 상권 반환
export async function getSeoulCommercialDistrict() : Promise<getSeoulCommercialDistrict_Param[]>{ //auto는 자치구이름,admin은 행정동이름
    let startIndex : number = 1
    let endIndex : number = 1000
    let url : string = `http://openapi.seoul.go.kr:8088/${process.env.AREA_COMMERCIAL_API_KEY}/json/TbgisTrdarRelm/${startIndex}/${endIndex}/`
    //http://openapi.seoul.go.kr:8088/4e587a724f646b6636376966764175/json/TbgisTrdarRelm/1/1/
    let tmp = await fetch(url).then((response)=>{
            return response.json()
        })

    const totalCount = tmp.TbgisTrdarRelm.list_total_count
    const result : getSeoulCommercialDistrict_Param[] = []


    while(true){
        url = `http://openapi.seoul.go.kr:8088/${process.env.AREA_COMMERCIAL_API_KEY}/json/TbgisTrdarRelm/${startIndex}/${endIndex}/`
        const res = await fetch(url).then((response)=>{
            return response.json()
        }).catch((error)=>{
            console.error(`${startIndex} ~ ${endIndex} 에서 ${error}에러`)
            return []
        })

        if (!res || (res.RESULT && res.RESULT.CODE === 'INFO-200')) {
            console.log(`데이터 없음 → 반복 종료`);
            break;
        }

        for(let tmp of res.TbgisTrdarRelm.row){
            result.push(tmp)
        }
      
        startIndex+=1000
        endIndex+=1000
    }

    console.dir(result,{depth : null})
    console.log(`서울시 영역 api 사용`)
    console.log(`total Data Length of 서울특별시 영역: ${result.length}`)
    return result
}

//서울시 부동산 전월세가 정보


//아래 main으로 populationController.ts 만 실행 가능 : testgit> 에서 tsx src/controllers/populationController.ts
/*
async function main() {
    console.log("테스트 실행 시작...");
    try {*/
        
        /*
        // 1. 유동인구 데이터 가져오기
        console.log("\n[1] 서울시 유동인구 데이터를 가져옵니다...");
        const populationData = await getSeoulFloatingPopulation();

        // 데이터가 너무 길 수 있으니, 처음 2개만 출력해봅니다.
        if (populationData && populationData.length > 0) {
            console.log("---------- 서울시 유동인구 데이터 (처음 2개) ----------");
            console.log(`${populationData[0].TRDAR_CD_NM}`)
            console.log(`\n총 ${populationData.length}개의 유동인구 데이터를 성공적으로 가져왔습니다.`);
        } else {
            console.log("-> 가져온 유동인구 데이터가 없습니다.");
        }

        console.log("\n------------------------------------------------------\n");
        
        
        
        // 2. 점포 수 데이터 가져오기
        console.log("[2] 서울시 상권 점포 수 데이터를 가져옵니다...");
        const marketCountData = await getSeoulMarketCount_commercial();
        
        // 데이터가 너무 길 수 있으니, 처음 2개만 출력해봅니다.
        if (marketCountData && marketCountData.length > 0) {
            console.log("---------- 서울시 상권 점포 수 데이터 (처음 2개) ----------");
            console.log(`${marketCountData[0].FRC_STOR_CO}`)
            console.log(`\n총 ${marketCountData.length}개의 점포 수 데이터를 성공적으로 가져왔습니다.`);
        } else {
            console.log("-> 가져온 점포 수 데이터가 없습니다.");
        }
        

        
        // 3. 직장인구(상권) 데이터 가져오기
        console.log("[3] 서울시 직장인구(상권) 데이터를 가져옵니다...");
        const companyPopulationCommercialData = await getSeoulCompanyPopulation_commercial();
        
        // 데이터가 너무 길 수 있으니, 처음 2개만 출력해봅니다.
        if (companyPopulationCommercialData && companyPopulationCommercialData.length > 0) {
            console.log("---------- 서울시 상권 직장인구(상권) 데이터  ----------");
            console.log(`${companyPopulationCommercialData[0].TOT_WRC_POPLTN_CO}`)
            console.log(`\n총 ${companyPopulationCommercialData.length}개의 직장인구(상권) 데이터를 성공적으로 가져왔습니다.`);
        } else {
            console.log("-> 가져온 직장인구(상권) 데이터가 없습니다.");
        }
          

        
        // 4. 직장인구(상권배후지) 데이터 가져오기
        console.log("[4] 서울시 직장인구(상권배후지) 데이터를 가져옵니다... ")
        const companyPopulationHinterlandData = await getSeoulCompanyPopulation_hinterland();

        if(companyPopulationHinterlandData && companyPopulationHinterlandData.length > 0) {
            console.log("---------- 서울시 상권 직장인구(상권배후지) 데이터  ----------")
            console.log(`${companyPopulationHinterlandData[0].TOT_WRC_POPLTN_CO}`)
            console.log(`\n총 ${companyPopulationHinterlandData.length}개의 직장인구(상권배후지) 데이터를 성공적으로 가져왔습니다`)
        } else {
            console.log("-> 가져온 직장인구(상권배후지) 데이터가 없습니다")
        }

        

        

        // 5. 점포(상권배후지) 데이터 가져오기 이거 년분기코드로 데이터를 적게 가지고 올 수 없음;;
        console.log("[5] 서울시 점포(상권배후지) 데이터를 가져옵니다... ")
        const marketCountHinterlandData = await getSeoulMarketCount_hinterland();

        if(marketCountHinterlandData && marketCountHinterlandData.length > 0) {
            console.log("---------- 서울시 상권 점포(상권배후지) 데이터  ----------")
            console.log(`${marketCountHinterlandData[0].STOR_CO}`)
            console.log(`\n총 ${marketCountHinterlandData.length}개의 점포(상권배후지) 데이터를 성공적으로 가져왔습니다`)
        } else {
            console.log("-> 가져온 점포 수(상권배후지) 데이터가 없습니다")
        }

        

        
        // 6.추정매출(상권) 데이터 가져오기
        console.log("[6] 서울시 추정매출(상권) 데이터를 가져옵니다... ")
        const estimateIncomeCommercialData = await getSeoulEstimateIncome_commercial();

        if(estimateIncomeCommercialData && estimateIncomeCommercialData.length > 0) {
            console.log("---------- 서울시 상권 추정매출(상권) 데이터  ----------")
            console.log(`${estimateIncomeCommercialData[0].THSMON_SELNG_AMT}`)
            console.log(`\n총 ${estimateIncomeCommercialData.length}개의 추정매출(상권) 데이터를 성공적으로 가져왔습니다`)
        } else {
            console.log("-> 가져온 추정 매출(상권) 데이터가 없습니다")
        }

        

        
        // 7.추정매출(상권배후지) 데이터 가져오기 -> 931438개 인데 여기서 더 못줄임 + 너무 오래걸림
        console.log("[7] 서울시 추정매출(상권배후지) 데이터를 가져옵니다... ")
        const estimateIncomeHinterlandData = await getSeoulEstimateIncome_hinterland();

        if(estimateIncomeHinterlandData && estimateIncomeHinterlandData.length > 0) {
            console.log("---------- 서울시 상권 추정매출(상권배후지) 데이터  ----------")
            console.log(`${estimateIncomeHinterlandData[0].THSMON_SELNG_AMT}`)
            console.log(`\n총 ${estimateIncomeHinterlandData.length}개의 추정매출(상권배후지) 데이터를 성공적으로 가져왔습니다`)
        } else {
            console.log("-> 가져온 추정 매출(상권배후지) 데이터가 없습니다")
        }
        */
/*
    } catch (error) {
        console.error("테스트 실행 중 오류 발생:", error);
    }
}

main()
*/

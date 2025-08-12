import dotenv from "dotenv"
import {getSeoulFloatingPopulation,
    getSeoulMarketCount_commercial
} from "../../controllers/populationController.js"

dotenv.config()


//서울특별시 영역에 따른 상권을 가져오는 메서드
//특정영역에 존재하는 상권 반환
export async function getSeoulCommercialDistrict_By_Region(auto : string,admin : string) : Promise<any>{ //auto는 자치구이름,admin은 행정동이름
    let startIndex : number = 1
    let endIndex : number = 1000
    let url : string = `http://openapi.seoul.go.kr:8088/${process.env.AREA_KEY}/json/TbgisTrdarRelm/${startIndex}/${endIndex}/`
    let tmp : any = await fetch(url).then((response)=>{
            return response.json()
        })

    //const totalCount = tmp.VwsmTrdarFlpopQq.list_total_count
    const result : any = []


    while(true){
        url = `http://openapi.seoul.go.kr:8088/${process.env.AREA_KEY}/json/TbgisTrdarRelm/${startIndex}/${endIndex}/`
        const res : any = await fetch(url).then((response)=>{
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
            if((tmp.SIGNGU_CD_NM === auto)&&(tmp.ADSTRD_CD_NM === admin))
                result.push(tmp.TRDAR_CD_NM)
                console.log(tmp.TRDAR_CD_NM)
            //자치구 코드 명은 SIGNGU_CD_NM, 행정동 코드명은 ADSTRD_CD_NM,상권이름은 TRDAR_CD_NM
        }
      
        startIndex+=1000
        endIndex+=1000
    }

    console.dir(result,{depth : null})
    console.log(`서울시 영역 api 사용`)
    console.log(`total Data Length of 서울특별시 영역: ${result.length}`)
    return result
}

//특정 자치구의 특정 행정동에 해당하는 상권들의 유동인구 평균을 구하는 함수
export async function getAverageFloatingPopulation_by_region(commercialRegion : any) : Promise<any>{ //admin은 행정동이름, auto는 자치구이름
   const list : any = await getSeoulFloatingPopulation()
   let sum : number = 0
   let cnt : number = 0
   //console.dir(list,{depth:null})
  
   for(let tmp of commercialRegion){
    for(let tmp1 of list){
        if(tmp1.TRDAR_CD_NM === tmp){
            sum += parseFloat(tmp1.TOT_FLPOP_CO)
            cnt++
        }
    }
   }
   //console.log(sum)
   sum /= cnt
   return sum
}

//특정 자치구 특정 행정동에 해당하는 상권들의 특정 업종 점포수 평균 구하는 함수
export async function getAverageMarketCount_by_region_and_industry(commercialRegion : any,industry : any) : Promise<any>{ //commercialRegion은 상권이름, industry는 업종이름
   const list : any = await getSeoulMarketCount_commercial()
   let sum : number = 0
   let cnt : number = 0
  
   for(let tmp of commercialRegion){
    for(let tmp1 of list){
        if((tmp1.TRDAR_CD_NM === tmp)&&(tmp1.SVC_INDUTY_CD_NM === industry)){
            sum += parseFloat(tmp1.STOR_CO)
            cnt++
        }
    }
   }
   sum /= cnt
   return sum
}



async function main(){
    const commercialRegion : any = await getSeoulCommercialDistrict_By_Region("강남구","역삼1동")
    const average_floating_population : any= await getAverageFloatingPopulation_by_region(commercialRegion)
    const average_market_count : any = await getAverageMarketCount_by_region_and_industry(commercialRegion,"편의점")
    console.log(`총 평균 유동인구 : ${average_floating_population}`)
    console.log(`총 평균 점포 수 ${average_market_count}`)
}

main()
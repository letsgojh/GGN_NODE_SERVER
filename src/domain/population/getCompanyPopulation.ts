import type {getSeoulCompanyPopulation_Param} from '../types.ts';

//서울특별시 직장인구(상권)을 가져오는 메서드
//낮 시간대 소비층 규모 파악
export default async function getSeoulCompanyPopulation_commercial(): Promise<getSeoulCompanyPopulation_Param[]>{
  let startIndex = 1
  let endIndex = 1000
  let cnt : number = 0
  let url = `http://openapi.seoul.go.kr:8088/${process.env.SEOUL_API_KEY}/json/VwsmTrdarWrcPopltnQq/${startIndex}/${endIndex}/`
  let tmp = await fetch(url).then((response)=>{
          return response.json()
      })

  const totalCount = tmp.VwsmTrdarWrcPopltnQq.list_total_count
  const result : getSeoulCompanyPopulation_Param[] = []


  while(true){
      url = `http://openapi.seoul.go.kr:8088/${process.env.SEOUL_API_KEY}/json/VwsmTrdarWrcPopltnQq/${startIndex}/${endIndex}/`
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
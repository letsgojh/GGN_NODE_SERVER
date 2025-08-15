import type {getSeoulEstimateIncome_Param} from '../types.ts';
//서울특별시 추정매출(상권 배후지)를 가져오는 메서드
//경쟁 대비 시장의 규모를 알려준다.
export default async function getSeoulEstimateIncome_hinterland() : Promise<getSeoulEstimateIncome_Param[]>{
  let startIndex = 1
  let endIndex = 1000
  let cnt : number = 0
  let url = `http://openapi.seoul.go.kr:8088/${process.env.SEOUL_API_KEY}/json/VwsmTrdhlSelngQq/${startIndex}/${endIndex}/`

  let tmp = await fetch(url).then((response)=>{
          return response.json()
      })

  const totalCount = tmp.VwsmTrdhlSelngQq.list_total_count
  const result : getSeoulEstimateIncome_Param[] = []


  while(true){
      url = `http://openapi.seoul.go.kr:8088/${process.env.SEOUL_API_KEY}/json/VwsmTrdhlSelngQq/${startIndex}/${endIndex}/`
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
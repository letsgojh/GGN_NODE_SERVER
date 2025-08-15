import type {getSeoulFloatingPopulationParam} from '../types.ts';

//서울특별시 유동인구수를 가져오는 메서드
//잠재 고객 규모 파악에 사용
export default async function getSeoulFloatingPopulation() : Promise<getSeoulFloatingPopulationParam[]>{
  let startIndex : number= 1
  let endIndex : number= 1000
  let cnt : number= 0;

  let url : string= `http://openapi.seoul.go.kr:8088/${process.env.SEOUL_API_KEY}/json/VwsmTrdarFlpopQq/${startIndex}/${endIndex}/20241`
  let tmp : any= await fetch(url).then((response)=>{
          return response.json()
      })

  const totalCount : string= tmp.VwsmTrdarFlpopQq.list_total_count
  const result : getSeoulFloatingPopulationParam[] = []


  while(true){
      url = `http://openapi.seoul.go.kr:8088/${process.env.SEOUL_API_KEY}/json/VwsmTrdarFlpopQq/${startIndex}/${endIndex}/20241`
      const res : any= await fetch(url).then((response)=>{
          return response.json()
      }).catch((error)=>{
          console.error(`${startIndex} ~ ${endIndex} 에서 ${error}에러`)
          return []
      })

      if (!res || (res.RESULT && res.RESULT.CODE === 'INFO-200')) {
          console.log(`데이터 없음 → 반복 종료 (Data Lenghth : ${totalCount})`);
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
  return result
}
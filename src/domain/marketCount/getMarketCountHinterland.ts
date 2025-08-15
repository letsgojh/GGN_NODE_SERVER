import type {getSeoulMarketCount_Param} from '../types.ts';

//서울특별시 점포 수(상권배후지)을 가져오는 메서드
//동일 업종 점포수(경쟁 강도) 파악
export async function getSeoulMarketCount_hinterland() : Promise<getSeoulMarketCount_Param[]>{
  let startIndex : number = 1
  let endIndex : number = 1000
  let cnt : number = 0
  let url : string = `http://openapi.seoul.go.kr:8088/${process.env.SEOUL_API_KEY}/json/VwsmTrdhlStorQq/${startIndex}/${endIndex}/`

  let tmp = await fetch(url).then((response)=>{
          return response.json()
      })

  const totalCount = tmp.VwsmTrdhlStorQq.list_total_count
  const result : getSeoulMarketCount_Param[] = []


  while(true){
      url = `http://openapi.seoul.go.kr:8088/${process.env.SEOUL_API_KEY}/json/VwsmTrdhlStorQq/${startIndex}/${endIndex}/`
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

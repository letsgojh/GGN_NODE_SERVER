//서울특별시 영역에 따른 상권을 가져오는 메서드
//특정영역에 존재하는 상권 반환
export default async function getSeoulCommercialDistrict_By_Region(auto : string,admin : string) : Promise<any>{ //auto는 자치구이름,admin은 행정동이름
    let startIndex : number = 1
    let endIndex : number = 1000
    let url : string = `http://openapi.seoul.go.kr:8088/${process.env.SEOUL_API_KEY}/json/TbgisTrdarRelm/${startIndex}/${endIndex}/`
    let tmp : any = await fetch(url).then((response)=>{
            return response.json()
        })

    //const totalCount = tmp.VwsmTrdarFlpopQq.list_total_count
    const result : any = []


    while(true){
        url = `http://openapi.seoul.go.kr:8088/${process.env.SEOUL_API_KEY}/json/TbgisTrdarRelm/${startIndex}/${endIndex}/`
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

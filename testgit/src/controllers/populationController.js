import pool from '../db.js';
import dotenv from "dotenv"
dotenv.config()

//api 1회 호출시 최대 1000건만 요청 가능 -> chunk 를 1000으로 지정


//서울특별시 유동인구수를 가져오는 메서드
//잠재 고객 규모 파악에 사용
export async function getSeoulFloatingPopulation(){
    let startIndex = 1
    let endIndex = 1000
    let url = `http://openapi.seoul.go.kr:8088/${process.env.AUTHENTICATION_KEY}/json/VwsmTrdarFlpopQq/${startIndex}/${endIndex}/20241`
    let tmp = await fetch(url).then((response)=>{
            return response.json()
        })

    //const totalCount = tmp.VwsmTrdarFlpopQq.list_total_count
    const result = []


    while(true){
        url = `http://openapi.seoul.go.kr:8088/${process.env.AUTHENTICATION_KEY}/json/VwsmTrdarFlpopQq/${startIndex}/${endIndex}/20241`
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

//서울특별시 직장인구(상권)을 가져오는 메서드
//낮 시간대 소비층 규모 파악
export async function getSeoulCompanyPopulation_commercial(){
    let startIndex = 1
    let endIndex = 1000
    let url = `http://openapi.seoul.go.kr:8088/${process.env.AUTHENTICATION_KEY}/json/VwsmTrdarWrcPopltnQq/${startIndex}/${endIndex}/`
    let tmp = await fetch(url).then((response)=>{
            return response.json()
        })

    //const totalCount = tmp.VwsmTrdarFlpopQq.list_total_count
    const result = []


    while(true){
        url = `http://openapi.seoul.go.kr:8088/${process.env.AUTHENTICATION_KEY}/json/VwsmTrdarWrcPopltnQq/${startIndex}/${endIndex}/`
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

        
        for(let tmp of res.VwsmTrdarFlpopQq.row){
            result.push(tmp)
        }
      
        startIndex+=1000
        endIndex+=1000
    }

    console.log(`서울시 직장인구-상권 api 사용`)
    console.log(`total Data Length of 서울시 직장인구(상권): ${result.length}`)
    return result
}

//서울특별시 직장인구(상권 배후지)을 가져오는 메서드
//낮 시간대 소비층 규모 파악
export async function getSeoulCompanyPopulation_hinterland(){
    let startIndex = 1
    let endIndex = 1000
    let url = `http://openapi.seoul.go.kr:8088/${process.env.AUTHENTICATION_KEY}/json/Vwsm_TrdhlWrcPopltnQq/${startIndex}/${endIndex}/`
    let tmp = await fetch(url).then((response)=>{
            return response.json()
        })

    //const totalCount = tmp.VwsmTrdarFlpopQq.list_total_count
    const result = []


    while(true){
        url = `http://openapi.seoul.go.kr:8088/${process.env.AUTHENTICATION_KEY}/json/Vwsm_TrdhlWrcPopltnQq/${startIndex}/${endIndex}/`
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

        
        for(let tmp of res.VwsmTrdarFlpopQq.row){
            result.push(tmp)
        }
      
        startIndex+=1000
        endIndex+=1000
    }

    console.log(`서울시 직장인구(상권배후지) api 사용`)
    console.log(`total Data Length of 서울시 직장인구(상권배후지): ${result.length}`)
    return result
}

//서울특별시 점포 수(상권)을 가져오는 메서드
//동일 업종 점포수(경쟁 강도) 파악
export async function getSeoulMarketCount_commercial(){
    let startIndex = 1
    let endIndex = 1000
    let url = `http://openapi.seoul.go.kr:8088/${process.env.AUTHENTICATION_KEY}/json/VwsmTrdarStorQq/${startIndex}/${endIndex}/20241`

    let tmp = await fetch(url).then((response)=>{
            return response.json()
        })

    //const totalCount = tmp.VwsmTrdarFlpopQq.list_total_count
    const result = []


    while(true){
        url = `http://openapi.seoul.go.kr:8088/${process.env.AUTHENTICATION_KEY}/json/VwsmTrdarStorQq/${startIndex}/${endIndex}/20241`
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

        
        for(let tmp of res.VwsmTrdarFlpopQq.row){
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

export async function getSeoulMarketCount_hinterland(){
    let startIndex = 1
    let endIndex = 1000
    let url = `http://openapi.seoul.go.kr:8088/${process.env.AUTHENTICATION_KEY}/json/VwsmTrdhlStorQq/${startIndex}/${endIndex}/`

    let tmp = await fetch(url).then((response)=>{
            return response.json()
        })

    //const totalCount = tmp.VwsmTrdarFlpopQq.list_total_count
    const result = []


    while(true){
        url = `http://openapi.seoul.go.kr:8088/${process.env.AUTHENTICATION_KEY}/json/VwsmTrdhlStorQq/${startIndex}/${endIndex}/`
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

        
        for(let tmp of res.VwsmTrdarFlpopQq.row){
            result.push(tmp)
        }
      
        startIndex+=1000
        endIndex+=1000
    }

    console.log(`서울시 점포 수(상권배후지) api 사용`)
    console.log(`total Data Length of 서울시 점포 수(상권배후지): ${result.length}`)
    return result
}

//서울특별시 추정매출(상권)을 가져오는 메서드
//경쟁 대비 시장의 규모를 알려준다.
export async function getSeoulEstimateIncome_commercial(){
    let startIndex = 1
    let endIndex = 1000
    let url = `http://openapi.seoul.go.kr:8088/${process.env.AUTHENTICATION_KEY}/json/VwsmTrdarSelngQq/${startIndex}/${endIndex}/`

    let tmp = await fetch(url).then((response)=>{
            return response.json()
        })

    //const totalCount = tmp.VwsmTrdarFlpopQq.list_total_count
    const result = []


    while(true){
        url = `http://openapi.seoul.go.kr:8088/${process.env.AUTHENTICATION_KEY}/json/VwsmTrdarSelngQq/${startIndex}/${endIndex}/`
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

        
        for(let tmp of res.VwsmTrdarFlpopQq.row){
            result.push(tmp)
        }
      
        startIndex+=1000
        endIndex+=1000
    }

    console.log(`서울시 추정 매출(상권) api 사용`)
    console.log(`total Data Length of 서울시 추정 매출(상권): ${result.length}`)
    return result
}

//서울특별시 추정매출(상권 배후지)를 가져오는 메서드
//경쟁 대비 시장의 규모를 알려준다.
export async function getSeoulEstimateIncome_hinterland(){
    let startIndex = 1
    let endIndex = 1000
    let url = `http://openapi.seoul.go.kr:8088/${process.env.AUTHENTICATION_KEY}/json/VwsmTrdhlSelngQq/${startIndex}/${endIndex}/`

    let tmp = await fetch(url).then((response)=>{
            return response.json()
        })

    //const totalCount = tmp.VwsmTrdarFlpopQq.list_total_count
    const result = []


    while(true){
        url = `http://openapi.seoul.go.kr:8088/${process.env.AUTHENTICATION_KEY}/json/VwsmTrdhlSelngQq/${startIndex}/${endIndex}/`
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

        
        for(let tmp of res.VwsmTrdarFlpopQq.row){
            result.push(tmp)
        }
      
        startIndex+=1000
        endIndex+=1000
    }

    console.log(`서울시 추정 매출(상권배후지) api 사용`)
    console.log(`total Data Length of 서울시 추정 매출(상권배후지): ${result.length}`)
    return result
}

//서울시 부동산 전월세가 정보

async function main(){
}

main()
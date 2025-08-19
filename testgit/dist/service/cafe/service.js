import dotenv from "dotenv";
import { getSeoulFloatingPopulation_commercial, getSeoulMarketCount_commercial, getSeoulCommercialDistrict_commercial, getSeoulCommercialDistrict_hinterland, } from '../../domain/domain.js';
dotenv.config();
const svcCode = "CS100010";
//서울특별시 영역에 따른 상권을 가져오는 메서드
//특정영역에 존재하는 상권 반환
export async function getSanggwon_By_Region_commercial(auto, admin) {
    let list = await getSeoulCommercialDistrict_commercial();
    const result = [];
    for (let tmp of list) {
        if ((tmp.SIGNGU_CD_NM === auto) && (tmp.ADSTRD_CD_NM === admin))
            result.push(tmp.TRDAR_CD_NM);
        //console.log(tmp.TRDAR_CD_NM)
        //자치구 코드 명은 SIGNGU_CD_NM, 행정동 코드명은 ADSTRD_CD_NM,상권이름은 TRDAR_CD_NM
    }
    return result;
}
//서울특별시 영역에 따른 상권배후지을 가져오는 메서드
//특정영역에 존재하는 상권배후지 반환
export async function getSanggwon_By_Region_hinterland(auto, admin) {
    let list = await getSeoulCommercialDistrict_hinterland();
    const result = [];
    for (let tmp of list) {
        if ((tmp.SIGNGU_CD_NM === auto) && (tmp.ADSTRD_CD_NM === admin))
            result.push(tmp.ALLEY_TRDAR_NM);
        //console.log(tmp.TRDAR_CD_NM)
        //자치구 코드 명은 SIGNGU_CD_NM, 행정동 코드명은 ADSTRD_CD_NM,상권이름은 TRDAR_CD_NM
    }
    return result;
}
//특정 자치구의 특정 행정동에 해당하는 상권들의 유동인구 평균을 구하는 함수(총 유동인구 평균, 21:00~06:00 유동인구 평균)
export async function getAverageFloatingPopulation_by_region(commercialRegion) {
    const list = await getSeoulFloatingPopulation_commercial();
    let cnt = 0;
    //총 유동인구, 시간별 유동인구
    let result = {
        AVERAGE_FLOTING_POPULATION: 0,
        AVERAGE_FLOTING_POPULATION_21_24: 0,
        AVERAGE_FLOTING_POPULATION_00_06: 0
    };
    for (let tmp of commercialRegion) {
        for (let tmp1 of list) {
            if (tmp1.TRDAR_CD_NM === tmp) {
                result.AVERAGE_FLOTING_POPULATION += parseFloat(tmp1.TOT_FLPOP_CO);
                result.AVERAGE_FLOTING_POPULATION_00_06 += parseFloat(tmp1.TMZON_00_06_FLPOP_CO);
                result.AVERAGE_FLOTING_POPULATION_21_24 += parseFloat(tmp1.TMZON_21_24_FLPOP_CO);
                cnt++;
            }
        }
    }
    //console.log(sum)
    result.AVERAGE_FLOTING_POPULATION /= cnt;
    result.AVERAGE_FLOTING_POPULATION_00_06 /= cnt;
    result.AVERAGE_FLOTING_POPULATION_21_24 /= cnt;
    return result;
}
//특정 상권의 유동인구 평균 구하는 함수(총 유동인구와 21:00 ~ 06:00 유동인구 평균 구한다)
export async function getFloatingPopulation_by_commercial_district(name) {
    const list = await getSeoulFloatingPopulation_commercial();
    //결과값 담을 인터페이스 초기화
    let result = {
        AVERAGE_FLOTING_POPULATION: 0,
        AVERAGE_FLOTING_POPULATION_21_24: 0,
        AVERAGE_FLOTING_POPULATION_00_06: 0,
    };
    for (let tmp of list) {
        if (tmp.TRDAR_CD_NM === name) {
            result.AVERAGE_FLOTING_POPULATION = tmp.TOT_FLPOP_CO;
            result.AVERAGE_FLOTING_POPULATION_21_24 = tmp.TMZON_21_24_FLPOP_CO;
            result.AVERAGE_FLOTING_POPULATION_00_06 = tmp.TMZON_00_06_FLPOP_CO;
            break;
        }
    }
    return result;
}
//특정 자치구 특정 행정동에 해당하는 상권들의 특정 업종 점포수 평균 구하는 함수
export async function getAverageMarketCount_by_region_and_industry(commercialRegion, industry) {
    const list = await getSeoulMarketCount_commercial();
    let sum = 0;
    let cnt = 0;
    for (let tmp of commercialRegion) {
        for (let tmp1 of list) {
            if ((tmp1.TRDAR_CD_NM === tmp) && (tmp1.SVC_INDUTY_CD_NM === industry)) {
                sum += parseFloat(tmp1.STOR_CO);
                cnt++;
            }
        }
    }
    sum /= cnt;
    return sum;
}
/*
async function main(){
    const commercialRegion : any = await getSanggwon_By_Region_commercial("영등포구","신길5동")
    const average_floating_population : any= await getAverageFloatingPopulation_by_region(commercialRegion)
    const floatingPopulation_by_commercial_district : any = await getFloatingPopulation_by_commercial_district("신풍역 3번")
    //const average_market_count : any = await getAverageMarketCount_by_region_and_industry(commercialRegion,"편의점")
    console.log(`지역 총 평균 유동인구 : ${JSON.stringify(average_floating_population,null,2)}`)
    console.log(`관심 상권 유동인구 : ${JSON.stringify(floatingPopulation_by_commercial_district,null,2)}`)
    //console.log(`지역 총 평균 점포 수 ${average_market_count}`)
    //낮에는 업무,통학등 수요가 섞여 편의점과 직접적 연관이 약함
    //console.log(`지역 시간별 유동인구 평균(편의점 핵심 시간대인 21:00 ~ 06:00만)`)
}

main()
*/ 

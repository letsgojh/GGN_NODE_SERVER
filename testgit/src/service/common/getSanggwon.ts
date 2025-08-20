import dotenv from "dotenv"
import {
    getSeoulCommercialDistrict_commercial_Param,
    getSeoulCommercialDistrict_hinterland_Param,
} from '../../domain/types.ts'

import {
    getSeoulCommercialDistrict_commercial,
    getSeoulCommercialDistrict_hinterland,
} from '../../domain/calledData.ts'

dotenv.config()


//서울특별시 영역에 따른 상권을 가져오는 메서드
//특정영역에 존재하는 상권 반환
export async function getSanggwon_By_Region_commercial(auto : string,admin : string) : Promise<any>{ //auto는 자치구이름,admin은 행정동이름
    let list : getSeoulCommercialDistrict_commercial_Param[]= await getSeoulCommercialDistrict_commercial()
    const result : string[] = []
    for(let tmp of list){
        if((tmp.SIGNGU_CD_NM === auto)&&(tmp.ADSTRD_CD_NM === admin))
            result.push(tmp.TRDAR_CD_NM)
            //console.log(tmp.TRDAR_CD_NM)
        //자치구 코드 명은 SIGNGU_CD_NM, 행정동 코드명은 ADSTRD_CD_NM,상권이름은 TRDAR_CD_NM
    }

    return result
}


//서울특별시 영역에 따른 상권배후지을 가져오는 메서드
//특정영역에 존재하는 상권배후지 반환
export async function getSanggwon_By_Region_hinterland(auto : string,admin : string) : Promise<any>{ //auto는 자치구이름,admin은 행정동이름
    let list : getSeoulCommercialDistrict_hinterland_Param[]= await getSeoulCommercialDistrict_hinterland()
    const result : string[] = []
    for(let tmp of list){
        if((tmp.SIGNGU_CD_NM === auto)&&(tmp.ADSTRD_CD_NM === admin))
            result.push(tmp.ALLEY_TRDAR_NM)
            //console.log(tmp.TRDAR_CD_NM)
        //자치구 코드 명은 SIGNGU_CD_NM, 행정동 코드명은 ADSTRD_CD_NM,상권이름은 TRDAR_CD_NM
    }

    return result
}
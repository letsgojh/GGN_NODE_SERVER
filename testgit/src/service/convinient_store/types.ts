//유동인구 interface 1
export interface getSeoulFloatingPopulation_param{
    VwsmTrdarFlpopQq : {
        list_total_count : number
        RESULT : {
            CODE : string
            MESSAGE : string
        }
        row : row[];
    }
}

//유동인구 interface2
export interface row{
        STDR_YYQU_CD: string
        TRDAR_SE_CD: string
        TRDAR_SE_CD_NM: string
        TRDAR_CD: string
        TRDAR_CD_NM: string
        SVC_INDUTY_CD: string
        SVC_INDUTY_CD_NM: string
        STOR_CO: number
        SIMILR_INDUTY_STOR_CO: number
        OPBIZ_RT: number
        OPBIZ_STOR_CO: number
        CLSBIZ_RT: number
        CLSBIZ_STOR_CO: number
        FRC_STOR_CO: number
}

/**
 * 서울시 유동인구(상권, 상권배후지) API의 데이터 구조를 정의하는 인터페이스
 */
export interface getSeoulFloatingPopulation_Param{

    STDR_YYQU_CD: string;               // 기준_년분기_코드
    TRDAR_SE_CD: string;                // 상권_구분_코드
    TRDAR_SE_CD_NM: string;             // 상권_구분_코드_명
    TRDAR_CD: string;                   // 상권_코드
    TRDAR_CD_NM: string;                // 상권_코드_명
    TOT_FLPOP_CO: number;               // 총_유동인구_수
    ML_FLPOP_CO: number;                // 남성_유동인구_수
    FML_FLPOP_CO: number;               // 여성_유동인구_수
    AGRDE_10_FLPOP_CO: number;          // 연령대_10_유동인구_수
    AGRDE_20_FLPOP_CO: number;          // 연령대_20_유동인구_수
    AGRDE_30_FLPOP_CO: number;          // 연령대_30_유동인구_수
    AGRDE_40_FLPOP_CO: number;          // 연령대_40_유동인구_수
    AGRDE_50_FLPOP_CO: number;          // 연령대_50_유동인구_수
    AGRDE_60_ABOVE_FLPOP_CO: number;    // 연령대_60_이상_유동인구_수
    TMZON_00_06_FLPOP_CO: number;       // 시간대_00_06_유동인구_수
    TMZON_06_11_FLPOP_CO: number;       // 시간대_06_11_유동인구_수
    TMZON_11_14_FLPOP_CO: number;       // 시간대_11_14_유동인구_수
    TMZON_14_17_FLPOP_CO: number;       // 시간대_14_17_유동인구_수
    TMZON_17_21_FLPOP_CO: number;       // 시간대_17_21_유동인구_수
    TMZON_21_24_FLPOP_CO: number;       // 시간대_21_24_유동인구_수
    MON_FLPOP_CO: number;               // 월요일_유동인구_수
    TUES_FLPOP_CO: number;              // 화요일_유동인구_수
    WED_FLPOP_CO: number;               // 수요일_유동인구_수
    THUR_FLPOP_CO: number;              // 목요일_유동인구_수
    FRI_FLPOP_CO: number;               // 금요일_유동인구_수
    SAT_FLPOP_CO: number;               // 토요일_유동인구_수
    SUN_FLPOP_CO: number;               // 일요일_유동인구_수
}

/**
 * 서울시 직장인구(상권, 상권배후지) API의 데이터 구조를 정의하는 인터페이스
 * 
 */
export interface getCompanyPopulation_Param{
    STDR_YYQU_CD: string;                   // 기준_년분기_코드
    TRDAR_SE_CD: string;                    // 상권_구분_코드
    TRDAR_SE_CD_NM: string;                 // 상권_구분_코드_명
    TRDAR_CD: string;                       // 상권_코드
    TRDAR_CD_NM: string;                    // 상권_코드_명
    TOT_WRC_POPLTN_CO: number;              // 총_직장_인구_수
    ML_WRC_POPLTN_CO: number;               // 남성_직장_인구_수
    FML_WRC_POPLTN_CO: number;              // 여성_직장_인구_수
    AGRDE_10_WRC_POPLTN_CO: number;         // 연령대_10_직장_인구_수
    AGRDE_20_WRC_POPLTN_CO: number;         // 연령대_20_직장_인구_수
    AGRDE_30_WRC_POPLTN_CO: number;         // 연령대_30_직장_인구_수
    AGRDE_40_WRC_POPLTN_CO: number;         // 연령대_40_직장_인구_수
    AGRDE_50_WRC_POPLTN_CO: number;         // 연령대_50_직장_인구_수
    AGRDE_60_ABOVE_WRC_POPLTN_CO: number;   // 연령대_60_이상_직장_인구_수
    MAG_10_WRC_POPLTN_CO: number;           // 남성연령대_10_직장_인구_수
    MAG_20_WRC_POPLTN_CO: number;           // 남성연령대_20_직장_인구_수
    MAG_30_WRC_POPLTN_CO: number;           // 남성연령대_30_직장_인구_수
    MAG_40_WRC_POPLTN_CO: number;           // 남성연령대_40_직장_인구_수
    MAG_50_WRC_POPLTN_CO: number;           // 남성연령대_50_직장_인구_수
    MAG_60_ABOVE_WRC_POPLTN_CO: number;     // 남성연령대_60_이상_직장_인구_수
    FAG_10_WRC_POPLTN_CO: number;           // 여성연령대_10_직장_인구_수
    FAG_20_WRC_POPLTN_CO: number;           // 여성연령대_20_직장_인구_수
    FAG_30_WRC_POPLTN_CO: number;           // 여성연령대_30_직장_인구_수
    FAG_40_WRC_POPLTN_CO: number;           // 여성연령대_40_직장_인구_수
    FAG_50_WRC_POPLTN_CO: number;           // 여성연령대_50_직장_인구_수
    FAG_60_ABOVE_WRC_POPLTN_CO: number;     // 여성연령대_60_이상_직장_인구_수
}

/**
 * 서울시 상주인구(상권, 상권배후지) API의 데이터 구조를 정의하는 인터페이스
 */
export interface getResidentPopulation_Param{
    STDR_YYQU_CD: string;               //	기준_년분기_코드
    TRDAR_SE_CD: string;                //	상권_구분_코드
    TRDAR_SE_CD_NM: string;             //	상권_구분_코드_명
    TRDAR_CD: string;                   //	상권_코드
    TRDAR_CD_NM: string;                //	상권_코드_명
    TOT_REPOP_CO: number;               //	총_상주인구_수
    ML_REPOP_CO: number;                //	남성_상주인구_수
    FML_REPOP_CO: number;               //	여성_상주인구_수
    AGRDE_10_REPOP_CO: number;          //	연령대_10_상주인구_수
    AGRDE_20_REPOP_CO: number;          //	연령대_20_상주인구_수
    AGRDE_30_REPOP_CO: number;          //	연령대_30_상주인구_수
    AGRDE_40_REPOP_CO: number;          //	연령대_40_상주인구_수
    AGRDE_50_REPOP_CO: number;          //	연령대_50_상주인구_수
    AGRDE_60_ABOVE_REPOP_CO: number;    //	연령대_60_이상_상주인구_수
    MAG_10_REPOP_CO: number;            //	남성연령대_10_상주인구_수
    MAG_20_REPOP_CO: number;            //	남성연령대_20_상주인구_수
    MAG_30_REPOP_CO: number;            //	남성연령대_30_상주인구_수     
    MAG_40_REPOP_CO: number;            //	남성연령대_40_상주인구_수   
    MAG_50_REPOP_CO: number;            //	남성연령대_50_상주인구_수
    MAG_60_ABOVE_REPOP_CO: number;      //	남성연령대_60_이상_상주인구_수    
    FAG_10_REPOP_CO: number;            //	여성연령대_10_상주인구_수
    FAG_20_REPOP_CO: number;            //	여성연령대_20_상주인구_수
    FAG_30_REPOP_CO: number;            //	여성연령대_30_상주인구_수    
    FAG_40_REPOP_CO: number;            //	여성연령대_40_상주인구_수   
    FAG_50_REPOP_CO: number;            //	여성연령대_50_상주인구_수
    FAG_60_ABOVE_REPOP_CO: number;      //	여성연령대_60_이상_상주인구_수
    TOT_HSHLD_CO: number;               //	총_가구_수
    APT_HSHLD_CO: number;               //	아파트_가구_수    
    NON_APT_HSHLD_CO: number;           //	비_아파트_가구_수
}

/**
 * 서울시 점포 수(상권, 상권배후지) API의 데이터 구조를 정의하는 인터페이스
 */
export interface getSeoulMarketCount_Param{
    STDR_YYQU_CD: string;           // 기준_년분기_코드
    TRDAR_SE_CD: string;            // 상권_구분_코드
    TRDAR_SE_CD_NM: string;         // 상권_구분_코드_명
    TRDAR_CD: string;               // 상권_코드
    TRDAR_CD_NM: string;            // 상권_코드_명
    SVC_INDUTY_CD: string;          // 서비스_업종_코드
    SVC_INDUTY_CD_NM: string;       // 서비스_업종_코드_명
    STOR_CO: number;                // 점포_수
    SIMILR_INDUTY_STOR_CO: number;  // 유사_업종_점포_수
    OPBIZ_RT: number;               // 개업_율
    OPBIZ_STOR_CO: number;          // 개업_점포_수
    CLSBIZ_RT: number;              // 폐업_률
    CLSBIZ_STOR_CO: number;         // 폐업_점포_수
    FRC_STOR_CO: number;            // 프랜차이즈_점포_수
}

/**
 * 서울시 추정매출(상권, 상권배후지) API의 데이터 구조를 정의하는 인터페이스
 */
export interface getSeoulEstimateIncome_Param{
    STDR_YYQU_CD: string;               // 기준_년분기_코드
    TRDAR_SE_CD: string;                // 상권_구분_코드
    TRDAR_SE_CD_NM: string;             // 상권_구분_코드_명
    TRDAR_CD: string;                   // 상권_코드
    TRDAR_CD_NM: string;                // 상권_코드_명
    SVC_INDUTY_CD: string;              // 서비스_업종_코드
    SVC_INDUTY_CD_NM: string;           // 서비스_업종_코드_명
    THSMON_SELNG_AMT: number;           // 당월_매출_금액
    THSMON_SELNG_CO: number;            // 당월_매출_건수
    MDWK_SELNG_AMT: number;             // 주중_매출_금액
    WKEND_SELNG_AMT: number;            // 주말_매출_금액
    MON_SELNG_AMT: number;              // 월요일_매출_금액
    TUES_SELNG_AMT: number;             // 화요일_매출_금액
    WED_SELNG_AMT: number;              // 수요일_매출_금액
    THUR_SELNG_AMT: number;             // 목요일_매출_금액
    FRI_SELNG_AMT: number;              // 금요일_매출_금액
    SAT_SELNG_AMT: number;              // 토요일_매출_금액
    SUN_SELNG_AMT: number;              // 일요일_매출_금액
    TMZON_00_06_SELNG_AMT: number;      // 시간대_00~06_매출_금액
    TMZON_06_11_SELNG_AMT: number;      // 시간대_06~11_매출_금액
    TMZON_11_14_SELNG_AMT: number;      // 시간대_11~14_매출_금액
    TMZON_14_17_SELNG_AMT: number;      // 시간대_14~17_매출_금액
    TMZON_17_21_SELNG_AMT: number;      // 시간대_17~21_매출_금액
    TMZON_21_24_SELNG_AMT: number;      // 시간대_21~24_매출_금액
    ML_SELNG_AMT: number;               // 남성_매출_금액
    FML_SELNG_AMT: number;              // 여성_매출_금액
    AGRDE_10_SELNG_AMT: number;         // 연령대_10_매출_금액
    AGRDE_20_SELNG_AMT: number;         // 연령대_20_매출_금액
    AGRDE_30_SELNG_AMT: number;         // 연령대_30_매출_금액
    AGRDE_40_SELNG_AMT: number;         // 연령대_40_매출_금액
    AGRDE_50_SELNG_AMT: number;         // 연령대_50_매출_금액
    AGRDE_60_ABOVE_SELNG_AMT: number;   // 연령대_60_이상_매출_금액
    MDWK_SELNG_CO: number;              // 주중_매출_건수
    WKEND_SELNG_CO: number;             // 주말_매출_건수
    MON_SELNG_CO: number;               // 월요일_매출_건수
    TUES_SELNG_CO: number;              // 화요일_매출_건수
    WED_SELNG_CO: number;               // 수요일_매출_건수
    THUR_SELNG_CO: number;              // 목요일_매출_건수
    FRI_SELNG_CO: number;               // 금요일_매출_건수
    SAT_SELNG_CO: number;               // 토요일_매출_건수
    SUN_SELNG_CO: number;               // 일요일_매출_건수
    TMZON_00_06_SELNG_CO: number;       // 시간대_00~06_매출_건수
    TMZON_06_11_SELNG_CO: number;       // 시간대_06~11_매출_건수
    TMZON_11_14_SELNG_CO: number;       // 시간대_11~14_매출_건수
    TMZON_14_17_SELNG_CO: number;       // 시간대_14~17_매출_건수
    TMZON_17_21_SELNG_CO: number;       // 시간대_17~21_매출_건수
    TMZON_21_24_SELNG_CO: number;       // 시간대_21~24_매출_건수
    ML_SELNG_CO: number;                // 남성_매출_건수
    FML_SELNG_CO: number;               // 여성_매출_건수
    AGRDE_10_SELNG_CO: number;          // 연령대_10_매출_건수
    AGRDE_20_SELNG_CO: number;          // 연령대_20_매출_건수
    AGRDE_30_SELNG_CO: number;          // 연령대_30_매출_건수
    AGRDE_40_SELNG_CO: number;          // 연령대_40_매출_건수
    AGRDE_50_SELNG_CO: number;          // 연령대_50_매출_건수
    AGRDE_60_ABOVE_SELNG_CO: number;    // 연령대_60_이상_매출_건수
    
}
/**
 * 서울시 임대료 API 정보의 데이터구조를 정의하는 인터페이스
 */
export interface getSeoulStorePrice_Param {
    RCPT_YR: string;                     // 접수연도
	CGG_CD: string;                      //	자치구코드
	CGG_NM: string;                      // 자치구명
	STDG_CD	: string;                    // 법정동코드
    STDG_NM: string;                     // 법정동명
	LOTNO_SE: string;                    // 지번구분
	LOTNO_SE_NM:  string;                // 지번구분명
	MNO:  string;                        //	본번
	SNO:  string;                        //	부번
	FLR:  number;                        //	층
	CTRT_DAY: string;                    // 계약일
	RENT_SE:  string;                    // 전월세 구분
	RENT_AREA: number;                   // 임대면적(㎡)
	GRFE:    number;                     //	보증금(만원)
	RTFE:     number;                    //	임대료(만원)
	BLDG_NM:  string;                    // 건물명
	ARCH_YR:  string;                    // 건축년도
	BLDG_USG: string;                    // 건물용도
	CTRT_PRD: string;                    // 계약기간
	NEW_UPDT_YN:  string;                // 신규갱신여부
	CTRT_UPDT_USE_YN:  string;           // 계약갱신권사용여부
	BFR_GRFE:  string;                   // 종전 보증금
	BFR_RTFE:  string;                   // 종전 임대료
}

/**
 * 서울시 영역 (상권) API 정보의 데이터구조를 정의하는 인터페이스
 */
export interface getSeoulCommercialDistrict_commercial_Param{
    TRDAR_SE_CD: string;	             // 상권_구분_코드
	TRDAR_SE_CD_NM: string;	             // 상권_구분_코드_명
	TRDAR_CD: string;	                 // 상권_코드
	TRDAR_CD_NM: string;	             // 상권_코드_명
	XCNTS_VALUE: string;	             // 엑스좌표_값
	YDNTS_VALUE: string;	             // 와이좌표_값
	SIGNGU_CD: string;	                 // 자치구_코드
	SIGNGU_CD_NM: string;	             // 자치구_코드_명
	ADSTRD_CD: string;	                 // 행정동_코드
	ADSTRD_CD_NM: string;	             // 행정동_코드_명
	RELM_AR: string;	                 // 영역_면적
}

/**
 * 서울시 영역 (상권배후지) API 정보의 데이터구조를 정의하는 인터페이스
 */
export interface getSeoulCommercialDistrict_hinterland_Param{
    ALLEY_TRDAR_CD: string;	             // 상권배후지_구분_코드
	ALLEY_TRDAR_NM: string;	             // 상권배후지_구분_코드_명
	XCNTS_VALUE: number;	             // 엑스좌표_값
	YDNTS_VALUE: number;	             // 와이좌표_값
	SIGNGU_CD: string;	                 // 자치구_코드
	SIGNGU_CD_NM: string;	             // 자치구_코드_명
	ADSTRD_CD: string;	                 // 행정동_코드
	ADSTRD_CD_NM: string;	             // 행정동_코드_명
    RELM_AR: number;	                 // 영역_면적 
}



export interface getAverageFloatingPopulation_by_region{
    AVERAGE_FLOTING_POPULATION : number;
    AVERAGE_FLOTING_POPULATION_21_24 : number;
    AVERAGE_FLOTING_POPULATION_00_06 : number;
}

//common.ts/getTotalPopPerStore_commercial
export interface getTotalPopPerStore_Param{
    TOTAL_FLOATING_POP_PER_STORE: number;
    TOTAL_COMPANY_POP_PER_STORE: number;
    TOTAL_RESIDENT_POP_PER_STORE: number;
    
}


//common.ts/getPredictedIncomePerPop_commercial
export interface getPredictedIncomePerPop_Param{
    PREDICTED_INCOME_PER_FLOATING_POP : number;
    PREDICTED_INCOME_PER_COMPANY_POP : number;
    PREDICTED_INCOME_PER_RESIDENT_POP : number;
    
}

export interface getSeoulEstimateIncome_district_Param{
    STDR_YYQU_CD: string;               // 기준_년분기_코드
    SIGNGU_CD: string;                  // 자치구_코드
    SIGNGU_CD_NM: string;               // 자치구_코드_명
    SVC_INDUTY_CD: string;              // 서비스_업종_코드
    SVC_INDUTY_CD_NM: string;           // 서비스_업종_코드_명
    THSMON_SELNG_AMT: number;           // 당월_매출_금액
    THSMON_SELNG_CO: number;            // 당월_매출_건수
    MDWK_SELNG_AMT: number;             // 주중_매출_금
    WKEND_SELNG_AMT: number;            // 주말_매출_금액
    MON_SELNG_AMT: number;              // 월요일_매출_금액
    TUES_SELNG_AMT: number;             // 화요일_매출_금액
    WED_SELNG_AMT: number;              // 수요일_매출_금액
    THUR_SELNG_AMT: number;             // 목요일_매출_금액
    FRI_SELNG_AMT: number;              // 금요일_매출_금액
    SAT_SELNG_AMT: number;              // 토요일_매출_금액
    SUN_SELNG_AMT: number;              // 일요일_매출_금액
    TMZON_00_06_SELNG_AMT: number;      // 시간대_00~06_매출_금액
    TMZON_06_11_SELNG_AMT: number;      // 시간대_06~11_매출_금액
    TMZON_11_14_SELNG_AMT: number;      // 시간대_11~14_매출_금액
    TMZON_14_17_SELNG_AMT: number;      // 시간대_14~17_매출_금액
    TMZON_17_21_SELNG_AMT: number;      // 시간대_17~21_매출_금액
    TMZON_21_24_SELNG_AMT: number;      // 시간대_21~24_매출_금액
    ML_SELNG_AMT: number;               // 남성_매출_금액
    FML_SELNG_AMT: number;              // 여성_매출_금액
    AGRDE_10_SELNG_AMT: number;         // 연령대_10_매출_금액
    AGRDE_20_SELNG_AMT: number;          // 연령대_20_매출_금액
    AGRDE_30_SELNG_AMT: number;         // 연령대_30_매출_금액
    AGRDE_40_SELNG_AMT: number;         // 연령대_40_매출_금액
    AGRDE_50_SELNG_AMT: number;         // 연령대_50_매출_금액
    AGRDE_60_ABOVE_SELNG_AMT: number;   // 연령대_60_이상_매출_금액
    MDWK_SELNG_CO: number;              // 주중_매출_건수
    WKEND_SELNG_CO: number;             // 주말_매출_건수
    MON_SELNG_CO: number;               // 월요일_매출_건수
    TUES_SELNG_CO: number;              // 화요일_매출_건수
    WED_SELNG_CO: number;               // 수요일_매출_건수
    THUR_SELNG_CO: number;              // 목요일_매출_건수
    FRI_SELNG_CO: number;               // 금요일_매출_건수
    SAT_SELNG_CO: number;               // 토요일_매출_건수
    SUN_SELNG_CO: number;               // 일요일_매출_건수
    TMZON_00_06_SELNG_CO: number;       // 시간대_00~06_매출_건수
    TMZON_06_11_SELNG_CO: number;       // 시간대_06~11_매출_건수
    TMZON_11_14_SELNG_CO: number;       // 시간대_11~14_매출_건수
    TMZON_14_17_SELNG_CO: number;       // 시간대_14~17_매출_건수
    TMZON_17_21_SELNG_CO: number;       // 시간대_17~21_매출_건수
    TMZON_21_24_SELNG_CO: number;       // 시간대_21~24_매출_건수
    ML_SELNG_CO: number;                // 남성_매출_건수
    FML_SELNG_CO: number;               // 여성_매출_건수
    AGRDE_10_SELNG_CO: number;          // 연령대_10_매출_건수
    AGRDE_20_SELNG_CO: number;          // 연령대_20_매출_건수
    AGRDE_30_SELNG_CO: number;          // 연령대_30_매출_건수
    AGRDE_40_SELNG_CO: number;          // 연령대_40_매출_건수
    AGRDE_50_SELNG_CO: number;          // 연령대_50_매출_건수
    AGRDE_60_ABOVE_SELNG_CO: number;    // 연령대_60_이상_매출_건수
}
export interface getPredictedIncomePerRent_Param{
    PREDICTED_INCOME_PER_RENT : number; // 임대료 대비 추정 매출 비율
}
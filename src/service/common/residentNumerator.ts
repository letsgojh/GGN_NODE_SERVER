/**
 * 서울시 상권별 상주인구 데이터 불러와서 numeratorType 형태로 변환하는 함수
 */

import {getResidentPopulation} from "../../domain/population/getResidentPopulation.ts";
import type { getSeoulResidentPopulation_Param } from "../../domain/types.ts";
import type { numeratorType } from "./numeratorType.ts";



export default async function getResidentNumerator(): Promise<numeratorType[]> {
  const rawData: getSeoulResidentPopulation_Param[] = await getResidentPopulation();
  return rawData.map((data) => {
    return {
      code: data.TRDAR_CD,
      name: data.TRDAR_CD_NM,
      quarter: data.STDR_YYQU_CD,
      value: data.TOT_REPOP_CO,
    };
  });
}
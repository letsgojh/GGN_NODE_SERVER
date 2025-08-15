import {getResidentPopulation} from "../../../domain/population/getResidentPopulation.ts";
import { getSeoulResidentPopulation_Param } from "../../../domain/types.ts";
import { numeratorType } from "../calcPerStoreMetrix.ts"

export async function residentNumerator(): Promise<numeratorType[]> {
  const rawData: getSeoulResidentPopulation_Param[] = await getResidentPopulation();
  return rawData.map((data:any) => ({
      code: data.TRDAR_CD,
      name: data.TRDAR_CD_NM,
      value: Number(data.TOT_REPOP_CO) || 0,
      quarter: data.STDR_YYQU_CD,
  }));
}
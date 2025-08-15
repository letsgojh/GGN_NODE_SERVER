import { Request, Response } from 'express';

// 공통 per-store 계산기 + 타입
import { calcPerStoreMetrix } from '../service/common/calcPerStoreMetrix.ts';
import type { AreaFilter } from '../service/common/area.ts';

// 분자: 상주인구 Numerator 어댑터
import { residentNumerator } from '../service/common/numerators/residentNumerator.ts';

/**
 * GET /resident?gu=강남구&dong=역삼&name=역삼1가&svcCode=CS1000100
 * - gu/dong/name: 지역 필터(부분일치)
 * - svcCode: 점포수 집계에 적용할 업종 코드(카페/편의점 등)
 */
export async function getResidentPerStore(req: Request, res: Response) {
  try {
    const { gu, dong, name: trdarName, svcCode } = req.query as {
      gu: string;
      dong: string;
      name: string;
      svcCode: string;
    };

    const area: AreaFilter = { gu, dong, trdarName };

    // 공통 계산기 호출: (상주인구 분자 / 업종별 점포수) → 관심/지역 평균 → ratio/label
    const result = await calcPerStoreMetrix({
      area,
      numeratorFetcher: residentNumerator,
      svcCode,
    });
  

    res.json(result);
  } catch (err) {
  

    console.error('resident per-store 계산 중 오류:', err);
    if(res.headersSent) return;
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

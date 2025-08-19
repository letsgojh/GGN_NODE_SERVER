import { calculateGrade } from '../service/common/populationList.js';
/**
 * GET
 * - description : 인구수(유동,직장,상주) / 점포수 들고오는 메서드
 * - gu,dong,name 형태의 쿼리로 request 구성
 * - svcCode : 점포수 집계에 적용할 업종 코드(카페/편의점 등)
 */
export async function getPopPerStore(req, res) {
    try {
        const { gu, dong, name } = req.query;
        const ans = await calculateGrade(gu, dong, name);
        res.json(ans);
    }
    catch (err) {
        if (err) {
            console.error('등급 판정 중 오류, 오류 메세지 : ', err);
            throw err;
        }
    }
}

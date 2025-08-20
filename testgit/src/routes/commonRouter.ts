import { Router } from 'express';
import { 
    getPopPerStore,
    getIncomePerPop,
    getFloatPopPerStore,
    getCompanyPopPerStore,
    getResidentPopPerStore,
    getIncomePerFloatPop,
    getIncomePerCompanyPop,
    getIncomePerResidentPop,
    getIndustry,
    getIncomePerRent
 } from '../controllers/commonController.ts';

const router = Router();

//대분류 업종에 소분류 업종 어떤 것이 있는지 알고싶다면
router.get('/category',getIndustry)

//유동인구 수 / 점포수 반환
router.get('/floatPopPerStore',getFloatPopPerStore)
//직장인구 수 / 점포수 반환
router.get('/companyPopPerStore',getCompanyPopPerStore)
//상주인구 수 / 점포수 반환
router.get('/residentPopPerStore',getResidentPopPerStore)
//인구(유동,직장,상주)인구 수 / 점포수 반환
router.get('/popPerStore', getPopPerStore);

//추정매출 / 유동 인구 수 반환
router.get('/incomePerFloatPop',getIncomePerFloatPop)
//추정매출 / 직장 인구 수 반환
router.get('/incomePerCompanyPop',getIncomePerCompanyPop)
//추정매출 / 상주 인구 수 반환
router.get('/incomePerResidentPop',getIncomePerResidentPop)
//추정매출 / 인구 수 반환
router.get('/incomePerPop',getIncomePerPop)

//추정매출 / 임대료 반환
/**
 * @openapi
 * /common/incomePerLent:
 *   get:
 *     tags:
 *       - Common
 *     operationId: getIncomePerLent
 *     summary: 
 *     description:
 *       자치구(gu)를 받아 인구당 추정매출을 지역 평균과 비교한 상대지표로 등급을 반환
 *       계산 방식: 해당 상권의 점포 추정매출을 유동, 직장, 상주인구 수 각각으로 나눈 값을 내부 기준으로 구간화하여 '유리/적정/불리' 등급을 반환합니다.
 *     parameters:
 *       - $ref: '#/components/parameters/GuQuery'
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Grade'
 *             examples:
 *               sample:
 *                 value:
 *                   float: "유리"
 *                   company: "적정"
 *                   resident: "불리"
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntity'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.get('/incomePerLent',getIncomePerRent);

//임대료 api와 전체 호출 api 추가해야함

export default router;

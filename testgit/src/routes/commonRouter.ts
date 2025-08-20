import { Router } from 'express';
import { 
    getPopPerStore,
    getIncomePerPop,
    getIncomePerRentService
 } from '../controllers/commonController.ts';
const router = Router();

/**
 * @openapi
 * /common/popPerStore:
 *   get:
 *     tags:
 *       - Common
 *     operationId: getPopPerStore
 *     summary: 인구/점포수 기반 '유리/적정/불리' 등급
 *     description: |
 *       자치구(gu), 행정동(dong), 상권명(name)을 받아 상권의 상대적 포화도를 등급으로 반환
 *       계산 방식:  해당 상권의 유동, 직장, 상주 인구수 각각을 점포수로 나누어 내부 기준으로 구간화하여 '유리/적정/불리' 등급을 반환
 *     parameters:
 *       - $ref: '#/components/parameters/GuQuery'
 *       - $ref: '#/components/parameters/DongQuery'
 *       - $ref: '#/components/parameters/NameQuery'
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Grade_Pop'
 *             examples: 
 *               sample:
 *                 value:
 *                   float: "유리"
 *                   company: "적정"
 *                   resident: "불리"
 *                                  
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntity'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.get('/popPerStore', getPopPerStore);

/**
 * @openapi
 * /common/incomePerPop:
 *   get:
 *     tags:
 *       - Common
 *     operationId: getIncomePerPop
 *     summary: 인구당 매출 기반 '유리/적정/불리' 등급
 *     description: |
 *       자치구(gu), 행정동(dong), 상권명(name)을 받아 인구당 추정매출을 지역 평균과 비교한 상대지표로 등급을 반환
 *       계산 방식: 해당 상권의 점포 추정매출을 유동, 직장, 상주인구 수 각각으로 나눈 값을 내부 기준으로 구간화하여 '유리/적정/불리' 등급을 반환합니다.
 *     parameters:
 *       - $ref: '#/components/parameters/GuQuery'
 *       - $ref: '#/components/parameters/DongQuery'
 *       - $ref: '#/components/parameters/NameQuery'
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Grade_Pop'
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
router.get('/incomePerPop', getIncomePerPop);

/**
 * @openapi
 * /common/IncomePerRentService:
 *   get:
 *     tags:
 *       - Common
 *     operationId: getIncomePerRentService
 *     summary: 해당 자치구의 임대료 대비 추정매출
 *     description: |
 *       자치구(gu)를 받아 임대료당 추정매출을 지역 평균과 비교한 상대지표로 등급을 반환
 *       계산 방식: (해당 자치구의 추정매출/해당 자치구의 평균임대료)를 (모든 자치구의 추정매출/모든 자치구의 평균임대료)로 나눈 값을 내부 기준으로 구간화하여 '유리/적정/불리' 등급을 반환합니다.
 *     parameters:
 *       - $ref: '#/components/parameters/GuQuery'
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Grade_Income'
 *             examples:
 *               sample:
 *                 value:
 *                   income: "유리"
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntity'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.get('/incomePerRentService', getIncomePerRentService);

export default router;
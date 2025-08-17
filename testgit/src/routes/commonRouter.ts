import { Router } from 'express';
import { 
    getPopPerStore,
    getIncomePerPop
 } from '../controllers/commonController.ts';
import express from 'express';
import type {Express, Request, Response} from 'express';
const router = Router();

/**
 * @openapi
 * /common/popPerStore:
 *   get:
 *     tags: [Common]
 *     summary: 인구/점포수 기반 '유리/적정/불리' 등급
 *     description: 자치구(gu), 행정동(dong), 상권명(name)을 받아 상권의 상대적 포화도를 등급으로 반환합니다.
 *     parameters:
 *       - $ref: '#/components/parameters/GuQuery'
 *       - $ref: '#/components/parameters/DongQuery'
 *       - $ref: '#/components/parameters/NameQuery'
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Grade' }
 *             examples:
 *               sample:
 *                 value: { "float":"불리", "company":"불리", "resident":"불리" }
 *       400:
 *         description: 잘못된 파라미터
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 *       500:
 *         description: 내부 오류
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 */

router.get('/popPerStore', getPopPerStore);

/**
 * @openapi
 * /common/incomePerPop:
 *   get:
 *     tags: [Common]
 *     summary: 인구당 매출 기반 등급(유동·직장·상주)
 *     description: 자치구(gu), 행정동(dong), 상권명(name)을 받아 인구당 추정매출을 지역 평균과 비교한 상대지표로 등급을 반환합니다.
 *     parameters:
 *       - $ref: '#/components/parameters/GuQuery'
 *       - $ref: '#/components/parameters/DongQuery'
 *       - $ref: '#/components/parameters/NameQuery'
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Grade' }
 *             examples:
 *               sample:
 *                 value: { "float":"불리", "company":"불리", "resident":"불리" }
 *       400:
 *         description: 잘못된 파라미터
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 *       500:
 *         description: 내부 오류
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 */

router.get('/incomePerPop',getIncomePerPop)

export default router;

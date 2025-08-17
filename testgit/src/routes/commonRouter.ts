import { Router } from 'express';
import { getPopPerStore } from '../controllers/popController.ts';
import express from 'express';
import type {Express, Request, Response} from 'express';
const router = Router();
console.log('✅ commonRouter.ts 실행됨');
/**
 * @swagger
 * /common:
 *   get:
 *     tags: [Common]
 *     summary: 인구/점포수 기반 '유리/적정/불리' 등급
 *     description: 자치구(gu), 행정동(dong), 상권명(name)을 받아 상권의 상대적 포화도를 등급으로 반환합니다.
 *     parameters:
 *       - in: query
 *         name: gu
 *         required: true
 *         schema: { type: string }
 *         example: 종로구
 *         description: 자치구 이름(또는 코드)
 *       - in: query
 *         name: dong
 *         required: true
 *         schema: { type: string }
 *         example: 부암동
 *         description: 행정동 이름(또는 코드)
 *       - in: query
 *         name: name
 *         required: true
 *         schema: { type: string }
 *         example: 자하문터널
 *         description: 상권 이름(TRDAR_CD_NM)
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Grade'
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

router.get('/', getPopPerStore);

router.get('/test', (req, res) => {
  console.log('🔥 /common/test 요청 도달');
  res.send('✅ /common/test OK');
});

export default router;

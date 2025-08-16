import express, { Router, Request, Response } from "express";
import {
  getSeoulFloatingPopulation_commercial,
  getSeoulFloatingPopulation_hinterland,
  getSeoulCompanyPopulation_commercial,
  getSeoulCompanyPopulation_hinterland,
  getResidentPopulation_commercial,
  getResidentPopulation_hinterland,
} from "../controllers/populationController.ts";

const router: Router = express.Router();

// 공통 응답 핸들링
async function handleRequest(fn: () => Promise<any>, res: Response) {
  try {
    const data = await fn();
    res.status(200).json(data);
  } catch (error: any) {
    console.error("[Router Error]", error);
    res.status(500).json({ message: "서버 오류", error: String(error?.message ?? error) });
  }
}

/**
 * @swagger
 * tags:
 *   - name: Population
 *     description: 서울시 상권/배후지 인구·상권 데이터
 */

/**
 * @swagger
 * /population/floating/commercial:
 *   get:
 *     summary: 서울시 유동인구(상권)
 *     tags: [Population]
 *     parameters:
 *       - in: query
 *         name: quarter
 *         schema:  type: string
 *         description: 기준_년분기_코드 (예: 20241)
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema: { type: array, items: { $ref: '#/components/schemas/FloatingPopulation' } }
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 */
router.get("/floating/commercial", (req, res) =>
  handleRequest(getSeoulFloatingPopulation_commercial, res)
);

/**
 * @swagger
 * /population/floating/hinterland:
 *   get:
 *     summary: 서울시 유동인구(상권배후지)
 *     tags: [Population]
 *     parameters:
 *       - in: query
 *         name: quarter
 *         schema: { type: string, pattern: "^[0-9]{5}$" }
 *         description: 기준_년분기_코드
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema: { type: array, items: { $ref: '#/components/schemas/FloatingPopulation' } }
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 */
router.get("/floating/hinterland", (req, res) =>
  handleRequest(getSeoulFloatingPopulation_hinterland, res)
);

/**
 * @swagger
 * /population/company/commercial:
 *   get:
 *     summary: 서울시 직장인구(상권)
 *     tags: [Population]
 *     parameters:
 *       - in: query
 *         name: quarter
 *         schema: { type: string }
 *         description: 기준_년분기_코드
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema: { type: array, items: { $ref: '#/components/schemas/CompanyPopulation' } }
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 */
router.get("/company/commercial", (req, res) =>
  handleRequest(getSeoulCompanyPopulation_commercial, res)
);

/**
 * @swagger
 * /population/company/hinterland:
 *   get:
 *     summary: 서울시 직장인구(상권배후지)
 *     tags: [Population]
 *     parameters:
 *       - in: query
 *         name: quarter
 *         schema: { type: string }
 *         description: 기준_년분기_코드
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema: { type: array, items: { $ref: '#/components/schemas/CompanyPopulation' } }
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 */
router.get("/company/hinterland", (req, res) =>
  handleRequest(getSeoulCompanyPopulation_hinterland, res)
);

/**
 * @swagger
 * /population/resident/commercial:
 *   get:
 *     summary: 서울시 상주인구(상권)
 *     tags: [Population]
 *     parameters:
 *       - in: query
 *         name: quarter
 *         schema: { type: string }
 *         description: 기준_년분기_코드
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema: { type: array, items: { $ref: '#/components/schemas/ResidentPopulation' } }
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 */
router.get("/resident/commercial", (req, res) =>
  handleRequest(getResidentPopulation_commercial, res)
);

/**
 * @swagger
 * /population/resident/hinterland:
 *   get:
 *     summary: 서울시 상주인구(상권배후지)
 *     tags: [Population]
 *     parameters:
 *       - in: query
 *         name: quarter
 *         schema: { type: string }
 *         description: 기준_년분기_코드
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema: { type: array, items: { $ref: '#/components/schemas/ResidentPopulation' } }
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 */
router.get("/resident/hinterland", (req, res) =>
  handleRequest(getResidentPopulation_hinterland, res)
);

export default router;
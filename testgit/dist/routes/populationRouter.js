import express from 'express';
import { getSeoulFloatingPopulation_commercial, getSeoulCompanyPopulation_commercial, getSeoulCompanyPopulation_hinterland, getSeoulMarketCount_commercial, getSeoulMarketCount_hinterland, getSeoulEstimateIncome_commercial, getSeoulEstimateIncome_hinterland, } from '../domain/calledData.js';
const router = express.Router();
// 공통 응답 핸들링 함수
async function handleRequest(fn, res) {
    try {
        const data = await fn();
        res.status(200).json(data);
    }
    catch (error) {
        console.error("[Router Error]", error);
        res.status(500).json({ message: "서버 오류", error });
    }
}
/**
 * @swagger
 * /api/population/floating:
 *   get:
 *     summary: 서울시 유동인구(상권)
 */
router.get('/floating', (req, res) => handleRequest(getSeoulFloatingPopulation_commercial, res));
/**
 * @swagger
 * /api/population/company/commercial:
 *   get:
 *     summary: 서울시 직장인구(상권)
 */
router.get('/company/commercial', (req, res) => handleRequest(getSeoulCompanyPopulation_commercial, res));
/**
 * @swagger
 * /api/population/company/hinterland:
 *   get:
 *     summary: 서울시 직장인구(상권배후지)
 */
router.get('/company/hinterland', (req, res) => handleRequest(getSeoulCompanyPopulation_hinterland, res));
/**
 * @swagger
 * /api/population/store/commercial:
 *   get:
 *     summary: 서울시 점포 수(상권)
 */
router.get('/store/commercial', (req, res) => handleRequest(getSeoulMarketCount_commercial, res));
/**
 * @swagger
 * /api/population/store/hinterland:
 *   get:
 *     summary: 서울시 점포 수(상권배후지)
 */
router.get('/store/hinterland', (req, res) => handleRequest(getSeoulMarketCount_hinterland, res));
/**
 * @swagger
 * /api/population/income/commercial:
 *   get:
 *     summary: 서울시 추정 매출(상권)
 */
router.get('/income/commercial', (req, res) => handleRequest(getSeoulEstimateIncome_commercial, res));
/**
 * @swagger
 * /api/population/income/hinterland:
 *   get:
 *     summary: 서울시 추정 매출(상권배후지)
 */
router.get('/income/hinterland', (req, res) => handleRequest(getSeoulEstimateIncome_hinterland, res));
export default router;

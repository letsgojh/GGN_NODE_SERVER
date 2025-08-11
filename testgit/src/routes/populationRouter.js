import express from 'express';
import {
    getFloatingPopulation,
    getFloatingPopulation10000,
    abc
}from '../controllers/populationController.js';

const router = express.Router();

/**
 * @swagger
 * /api/population:
 *   get:
 *     summary: 유동 인구 조회
 *     responses:
 *       200:
 *         description: 성공
 */
router.get('/',getFloatingPopulation);

/**
 * @swagger
 * /api/population/u:
 *   get:
 *     summary: 유동 인구 관광특구만 조회
 *     responses:
 *       200:
 *         description: 성공
 */
router.get('/u',getFloatingPopulation10000);

/**
 * @swagger
 * /api/population/a:
 *   get:
 *     summary: test
 */
router.get('/a',abc)

export default router;
import express, { Router, Request, Response } from 'express';
import {
    getFloatingPopulation,
    getFloatingPopulation10000,
    abc
} from '../controllers/populationController.js';

const router: Router = express.Router();

/**
 * @swagger
 * /api/population:
 * get:
 * summary: 유동 인구 조회
 * responses:
 * 200:
 * description: 성공
 */
router.get('/', (req: Request, res: Response) => getFloatingPopulation(req, res));

/**
 * @swagger
 * /api/population/u:
 * get:
 * summary: 유동 인구 관광특구만 조회
 * responses:
 * 200:
 * description: 성공
 */
router.get('/u', (req: Request, res: Response) => getFloatingPopulation10000(req, res));

/**
 * @swagger
 * /api/population/a:
 * get:
 * summary: test
 */
router.get('/a', (req: Request, res: Response) => abc(req, res));

export default router;
import { Router } from 'express';
import { 
    getPopPerStore,
    getIncomePerPop
 } from '../controllers/commonController.ts';
import express from 'express';
import type {Express, Request, Response} from 'express';
const router = Router();

router.get('/popPerStore', getPopPerStore);
router.get('/incomePerPop',getIncomePerPop)

export default router;

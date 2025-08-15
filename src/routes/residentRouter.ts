import { Router } from 'express';
import { getResidentPerStore } from '../controllers/residentController.ts';
import express from 'express';
import type {Express, Request, Response} from 'express';
const router = Router();

router.get('/', getResidentPerStore);
export default router;

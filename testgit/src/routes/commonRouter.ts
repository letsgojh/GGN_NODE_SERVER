import { Router } from 'express';
import { getPopPerStore } from '../controllers/popController.ts';
import express from 'express';
import type {Express, Request, Response} from 'express';
const router = Router();
console.log('✅ commonRouter.ts 실행됨');

router.get('/', getPopPerStore);

router.get('/test', (req, res) => {
  console.log('🔥 /common/test 요청 도달');
  res.send('✅ /common/test OK');
});

export default router;

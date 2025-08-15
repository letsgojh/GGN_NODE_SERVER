import { Router } from 'express';
import commonRouter from './commonRouter.ts';

const router: Router = Router();

//router.use('/population', populationRouter);
console.log('✅ index.ts 라우터 등록됨');
router.use('/common',commonRouter)

export default router;
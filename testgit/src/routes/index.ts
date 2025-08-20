import { Router } from 'express';
import commonRouter from './commonRouter.ts';

const router: Router = Router();

router.use('/common',commonRouter);

export default router;
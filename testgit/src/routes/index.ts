import { Router } from 'express';
import commonRouter from './commonRouter.ts';

const router: Router = Router();

//router.use('/population', populationRouter);
router.use('/common',commonRouter)

export default router;
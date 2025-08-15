import { Router } from 'express';
import type { Request, Response } from 'express';
import residentRouter from './residentRouter.ts';
const router:Router = Router();



router.use('/resident', residentRouter);
export default router;
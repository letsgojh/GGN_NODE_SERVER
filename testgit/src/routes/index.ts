<<<<<<< HEAD
import { Router } from "express";
import populationRouter from "./populationRouter.ts";

const router: Router = Router();

// /api/population/* 엔드포인트
router.use("/population", populationRouter);
=======
import { Router } from 'express';
import commonRouter from './commonRouter.ts';

const router: Router = Router();

router.use('/common',commonRouter);
>>>>>>> fabc089f1f5ac97fc7ad2816dc0559a771749ede

export default router;
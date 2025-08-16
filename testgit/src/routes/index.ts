import { Router } from "express";
import populationRouter from "./populationRouter.ts";

const router: Router = Router();

// /api/population/* 엔드포인트
router.use("/population", populationRouter);

export default router;
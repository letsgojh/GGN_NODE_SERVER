import express, { Router } from 'express';
import populationRouter from './populationRouter.js';

const router: Router = Router();

router.use('/population', populationRouter);

export default router;
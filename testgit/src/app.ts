import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from 'express';
import router from './routes/index.ts';

dotenv.config();

const PORT: number = parseInt(process.env.PORT || '3000', 10);
const app: Express = express();

//console.dir(pool, { depth: null });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use("/api.docs", swaggerUi.serve, swaggerUi.setup(specs));
//app.use('/api', router);
console.log('✅ app.ts 시작');

app.use('/',router)
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
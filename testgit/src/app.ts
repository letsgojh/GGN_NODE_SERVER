import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from 'express';
import router from './routes/index.ts';
import specs from "./swagger.js";
import swaggerUi from 'swagger-ui-express';
import pool from "./db.js";
import {
    getSeoulEstimateIncome_district,
    getSeoulStorePrice
} from './domain/domain.ts';
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
app.get('/test',async (req:Request, res:Response)=>{
    try{
        const data = await getSeoulStorePrice();
        res.json({message:data});
    }catch(err){
        console.error(err);
        res.status(500).json({error:"error"})
    }
})
app.get('/test1',async (req:Request, res:Response)=>{
    try{
        const data = await getSeoulEstimateIncome_district();
        res.json({message:data});
    }catch(err){
        console.error(err);
        res.status(500).json({error:"error"})
    }
})
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
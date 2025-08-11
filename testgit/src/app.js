import dotenv from "dotenv";
import express from 'express';
import router from './routes/index.js';
import specs from "./swagger.js";
import swaggerUi from 'swagger-ui-express';
import pool from "./db.js";
const PORT = process.env.PORT || 3000;
const app = express();

console.dir(pool,{depth:null});
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api.docs",swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api',router);


app.listen(PORT,()=>{
    console.log(`Start Server!!`);
});
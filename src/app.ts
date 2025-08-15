import express from 'express';
import router from './routes/index.ts'; 
import 'dotenv/config';

const app = express();
app.use(express.json());

app.use('/', router);

const PORT = Number(process.env.PORT ?? 3000);
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

export default app;

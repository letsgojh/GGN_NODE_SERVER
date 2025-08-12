import mysql, { Pool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool: Pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, // .env 파일에서는 DB_PASS로 되어있을 수 있습니다. 일관성을 위해 확인이 필요합니다.
    database: process.env.DB_NAME,
    connectionLimit: 10
});

export default pool;
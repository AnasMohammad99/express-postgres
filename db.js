import pg from "pg";
const { Pool } = pg;

const localPoolConfig = {
    user: 'postgres',
    password: '1699',
    port: '5432',
    database: 'jwttest',
    host: 'localhost'
};

const poolConfig = process.env.DATABASE_URL? {
    connetionString: process.env.DATABASE_URL, 
    ssl:{rejectunauthorized}}: localPoolConfig;

const pool = new Pool(poolConfig);

export default pool;
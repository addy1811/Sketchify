import pkg from 'pg';  // Default import
const { Pool } = pkg;  // Destructure the Pool class from the package

import dotenv from 'dotenv';

dotenv.config();

// PostgreSQL connection pool setup
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export { pool };

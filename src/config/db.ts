import { Pool } from 'pg';
import dotenv from 'dotenv';
import { Logger } from 'tslog';

dotenv.config();


const logger = new Logger();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, 
});


pool.connect()
  .then(() => {
    logger.info('Database connection established successfully.');
  })
  .catch((err) => {
    logger.error('Error connecting to the database:', err);
    process.exit(1); 
  });


export default pool;

// error test function
export const executeQuery = async (query: string, params?: any[]) => {
  try {
    const result = await pool.query(query, params);
    return result;
  } catch (error) {
    logger.error('Error executing query:', error);
    throw error; 
  }
};
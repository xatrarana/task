import app from './app'; 
import dotenv from 'dotenv';
import { Logger } from 'tslog'; 

dotenv.config();


const logger = new Logger();
const PORT = process.env.PORT || 3000;

// Start the server
const server = app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  logger.error('Unhandled promise rejection:', error);
  server.close(() => {
    process.exit(1); 
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught exception:', error);
  server.close(() => {
    process.exit(1);
  });
});
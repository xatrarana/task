import app from './app'; // Import the app from app.ts
import dotenv from 'dotenv';
import { Logger } from 'tslog'; // Import a logging library

dotenv.config();

// Create a logger instance
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
    process.exit(1); // Exit the process with failure
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught exception:', error);
  server.close(() => {
    process.exit(1); // Exit the process with failure
  });
});
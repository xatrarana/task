# Server Project

This is the backend of the task management application, built with **Express.js** and **TypeScript**. The application follows a **Repository and Service Architecture**, making it modular and easy to maintain. The project interacts with a **PostgreSQL database** using **pg** (no ORM is used). The backend is structured using standard REST API patterns with a focus on scalability and maintainability.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Architecture Overview](#architecture-overview)
- [Project Setup](#project-setup)
- [Running the Application](#running-the-application)
- [Folder Structure](#folder-structure)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [License](#license)

## Technologies Used

- **Express.js**: A fast, unopinionated, minimalist web framework for Node.js.
- **TypeScript**: A strongly-typed programming language that builds on JavaScript.
- **PostgreSQL**: A powerful, open-source object-relational database system.
- **pg**: PostgreSQL client for Node.js.
- **bcryptjs**: Library for hashing passwords securely.
- **jsonwebtoken**: Library to issue JSON Web Tokens for authentication.
- **tslog**: A simple logging library.
- **dotenv**: Loads environment variables from a `.env` file.

## Architecture Overview

The backend follows the **Repository and Service Architecture** pattern. Here's a breakdown of how the application is structured:

- **Repositories**: Handle data interactions directly with the PostgreSQL database using plain SQL queries via the `pg` package.
- **Controllers**: Manage the HTTP requests, interact with the services, and send appropriate responses to the client.
- **Services**: Business logic layer that handles the processing of data and interacts with repositories.
- **Middleware**: Middleware functions for things like authentication, logging, and request validation.

## Project Setup

Follow the steps below to set up the project on your local machine.

### Prerequisites

1. Install [Node.js](https://nodejs.org/) (preferably the latest LTS version).
2. Install [PostgreSQL](https://www.postgresql.org/download/) and set up a database.

### Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/xatrarana/task.git](https://github.com/xatrarana/task.git)
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd task
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Set up environment variables:**
    Create a `.env` file in the root of the project directory and configure the following environment variables according to your PostgreSQL setup and desired application settings:

    ```env
    DATABASE_URL=""
    JWT_SECRET=your_jwt_secret
    PORT=3000
    ```

    * `PORT`: The port on which the application will run (default is 3000).
    * `DATABASE_URL`: connection string of the neon postgres database in my case./
    * `JWT_SECRET`: A secret key used for signing JSON Web Tokens for authentication. **Ensure this is a strong and unique value.**

5.  **Database Setup:**
    Before running the application, ensure that PostgreSQL is running and the database specified in your `.env` file exists. Then, run the following command to set up the database schema (create tables and potentially seed initial data):

    ```bash
    npm run setup-db
    ```

    This command executes the script located at `src/config/dbSetup.js`.

## Running the Application

You can run the application in different modes using the following npm scripts:

### Development Mode

Automatically reloads the server on file changes, providing a convenient development experience.

```bash
npm run dev
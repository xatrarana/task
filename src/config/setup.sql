-- blacklisted tokens
CREATE TABLE IF NOT EXISTS blacklisted_tokens (
    id SERIAL PRIMARY KEY,
    token VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--  users
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- tasks
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

--  CHECK constraint for the status column
ALTER TABLE tasks
ADD CONSTRAINT status_check CHECK (status IN ('pending', 'in_progress', 'completed'));

-- Create a view to combine user and task information
CREATE VIEW user_tasks AS
SELECT 
    u.id AS user_id,
    u.username,
    t.id AS task_id,
    t.title,
    t.status
FROM 
    users u
LEFT JOIN 
    tasks t ON u.id = t.user_id;

-- Create an index on the status column of the tasks table
CREATE INDEX idx_task_status ON tasks(status);
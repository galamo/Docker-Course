

# **Home Assignment: Node.js API with MySQL and JWT Authentication**

## **Assignment Overview**

The goal of this assignment is to create a full-stack application with the following requirements:

- **Backend API**: A Node.js Express API using TypeScript that exposes data from a MySQL database, with full security and logging.
- **Database Schema**: The database will store AI tools data.
- **Frontend**: A static frontend served by the Node.js API that displays the AI tools in a table.
- **Dockerization**: The entire application must be dockerized, and a Docker Compose file should host both the MySQL database and the Node.js server.

## **Assignment Details**

### **Requirements:**

1. **Backend API:**

   - **Node.js Application** built using **Express** and **TypeScript**.
   - The backend should have a single endpoint `GET /ai-tools` to fetch data from the MySQL database.
   - The endpoint should be **protected** and only accessible after the user logs in with the **username: admin** and **password: admin**.
   - **JWT Authentication**: Upon successful login, a JWT token should be granted to the user. This token should be included in subsequent requests to access the protected endpoint.
   - The application should log each request, including login attempts and any access to the `GET /ai-tools` endpoint.

2. **Frontend:**

   - **HTML + JavaScript Frontend** served statically by the Node.js server.
   - The frontend should display a **table** that shows the **AI Tools** data retrieved from the API.
   - Upon successful login, the frontend should send the JWT token in the `Authorization` header for the `GET /ai-tools` request.

3. **Database:**

   - **MySQL** should be used as the database.
   - The schema should be created using the provided **SQL starter script**, which includes a table for storing AI tools.
   - Insert sample data into the `ai_tools` table as specified in the SQL script.

4. **Dockerization:**

   - The application (both the MySQL database and the Node.js server) must be **fully dockerized**.
   - A **Docker Compose** file should be used to define the services for both MySQL and the Node.js API.
   - The MySQL database should be preconfigured with the `ai_tools_catalog` schema and data.

---

### **Steps to Complete the Assignment**

#### 1. **Setup MySQL Database using docker:**

Using the provided SQL script, create a MySQL schema (`ai_tools_catalog`) and populate the `ai_tools` table with sample data. The schema should contain:

- `id`: Auto-incrementing primary key
- `name`: Name of the AI tool
- `year_published`: Year the tool was published
- `cost_usd_per_month`: Monthly cost in USD
- `average_monthly_users`: Number of monthly users

#### 2. **Backend API:**

- Initialize a Node.js Express project with TypeScript.
- Install required dependencies (`express`, `jsonwebtoken`, `mysql2`, `dotenv`, `cors`, `morgan`, `body-parser`, `typescript`, `ts-node`).
- Create the following endpoints:

  - `POST /login`: Endpoint that accepts the credentials (`username` and `password`). If valid, a JWT token should be issued.
  - `GET /ai-tools`: A protected endpoint that fetches AI tools data from MySQL and returns it as JSON. This endpoint should require a valid JWT token to access.

- Implement **JWT Authentication**:

  - On login, generate and return a JWT token.
  - Protect the `/ai-tools` endpoint using a middleware that verifies the JWT token.

- Implement **Logging**: Use `morgan` for logging HTTP requests, including failed login attempts.

#### 3. **Frontend:**

- Create a simple HTML page that is served by the Node.js application at the root endpoint (`GET /`).
- The page should contain:

  - A login form where the user enters the **username** (`admin`) and **password** (`admin`).
  - Upon successful login, the JWT token should be stored in local storage or session storage.
  - A table that displays the data returned from the `GET /ai-tools` endpoint. The table should show the `name`, `year_published`, `cost_usd_per_month`, and `average_monthly_users` fields.

#### 4. **Dockerization:**

- Create a **Dockerfile** for the Node.js application.
- Create a **Docker Compose** file to spin up both the MySQL database and the Node.js API server.

  - Ensure the MySQL container is pre-configured with the `ai_tools_catalog` schema and the sample data.
  - The Node.js container should connect to the MySQL container.
  - Expose the necessary ports for both MySQL (3306) and the Node.js API (e.g., 3000).

---

### **Required Technologies:**

- **Node.js** with **Express** framework
- **TypeScript**
- **JWT Authentication**
- **MySQL Database** with the provided schema
- **Docker** for containerization
- **Docker Compose** to manage multiple containers
- **HTML/JavaScript** for the frontend

---

### **Deliverables:**

1. **Source Code:**

   - A Git repository containing all the code for the backend API, frontend, and Docker configurations.

2. **README File:**

   - Instructions on how to set up and run the project locally using Docker.
   - Example API usage for login and fetching AI tools data.

3. **Docker Configuration:**

   - A working `Dockerfile` for the Node.js application.
   - A `docker-compose.yml` file to spin up the MySQL and Node.js containers.

---

### **SQL Starter Script** (for MySQL):

```sql
-- Drop schema if exists for re-creation (optional)
DROP SCHEMA IF EXISTS ai_tools_catalog CASCADE;

-- Create a new schema
CREATE SCHEMA ai_tools_catalog;

-- Switch to using the new schema
SET search_path TO ai_tools_catalog;

-- Create the ai_tools table
CREATE TABLE ai_tools (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    year_published INT CHECK (year_published >= 1950 AND year_published <= EXTRACT(YEAR FROM CURRENT_DATE)),
    cost_usd_per_month DECIMAL(10,2) CHECK (cost_usd_per_month >= 0),
    average_monthly_users INT CHECK (average_monthly_users >= 0)
);

-- Insert sample data into ai_tools
INSERT INTO ai_tools (name, year_published, cost_usd_per_month, average_monthly_users)
VALUES
    ('ChatGPT', 2022, 20.00, 100000000),
    ('Midjourney', 2022, 30.00, 1500000),
    ('DALL·E', 2021, 15.00, 1200000),
    ('Notion AI', 2023, 10.00, 2500000),
    ('GitHub Copilot', 2021, 10.00, 2000000),
    ('Jasper AI', 2021, 49.00, 500000),
    ('Perplexity AI', 2023, 0.00, 2000000),
    ('Synthesia', 2020, 30.00, 350000),
    ('Runway ML', 2021, 12.00, 700000),
    ('Claude (Anthropic)', 2023, 0.00, 3000000);
```

---

Good luck!

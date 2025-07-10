# ts-api

This is a simple Node.js API written in **TypeScript**, demonstrating how to fetch your public IP using Axios and Express.

## Project Structure

```
ts-api/
├── src/
│   └── index.ts
├── package.json
├── tsconfig.json
├── Dockerfile
```

---

## Getting Started

### 1. Install Dependencies (for local dev)

```bash
npm install
```

### 2. Run Locally (using ts-node-dev)

```bash
npx ts-node-dev src/index.ts
```

---

## Run in Docker

### 1. Build the Docker Image

```bash
docker build -t ts-api .
```

### 2. Run the Container

```bash
docker run -p 3000:3000 ts-api
```

---

## Test the API

```bash
curl http://localhost:3000/ip
```

Expected response:

```json
{ "your_ip": "xxx.xxx.xxx.xxx" }
```

---

## Tech Stack

- Node.js
- TypeScript
- Express
- Axios

---

## Notes

- The `tsconfig.json` is configured to compile to `dist/`, but Docker builds everything internally.
- The `Dockerfile` uses multi-stage build for efficiency.

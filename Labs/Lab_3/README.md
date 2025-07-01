# env-script

This is a simple Node.js script that prints an environment variable from a `.env` file.

## 🛠️ How to Run with Docker

### 1. Build the Docker Image

```bash
docker build -t env-script .
```

### 2. Run the Container

```bash
docker run --env-file .env env-script
```

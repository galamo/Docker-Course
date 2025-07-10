# network-api

This is a simple Node.js API that fetches your public IP using the `ipify` API.

## How to Run with Docker

### 1. Build the Docker Image

```bash
docker build -t network-api .
```

### 2. Run the Container

```bash
docker run -p 3000:3000 network-api
```

### 3. Test the API

In your browser or with curl:

```bash
curl http://localhost:3000/ip
```

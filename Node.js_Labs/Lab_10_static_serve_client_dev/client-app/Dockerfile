# Dockerfile
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies early (use dummy package.json for caching)
COPY client/package*.json ./
RUN npm install -g vite && npm install

# Copy actual source code (mounted later in dev)
COPY . ./

EXPOSE 5173
CMD ["npm", "run", "dev"]

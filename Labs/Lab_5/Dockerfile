# Stage 1: Build
FROM node:18 AS build

WORKDIR /app

COPY package.json tsconfig.json ./
RUN npm install

COPY src ./src
RUN npm run build

# Stage 2: Run
FROM node:18

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY package.json ./

RUN npm install --only=production

CMD ["node", "dist/index.js"]
EXPOSE 3000

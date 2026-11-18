# FRONTEND BUILD
FROM node:22-alpine AS frontend-build

WORKDIR /app

COPY frontend/package*.json ./

RUN npm ci

COPY frontend/ .

RUN npm run build


# FRONTEND PRODUCTION
FROM nginx:alpine AS frontend

COPY --from=frontend-build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80


# BACKEND
FROM node:22-alpine AS backend

WORKDIR /app

COPY backend/package*.json ./

RUN npm ci --omit=dev

COPY backend/ .

EXPOSE 5000

CMD ["node", "server.js"]


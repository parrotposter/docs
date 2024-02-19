FROM node:20 AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM deps as builder
COPY . .
ENV BASE_URL /docs/
RUN npm run docs:build

FROM nginx:1.21.3-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/.dist /usr/share/nginx/html
EXPOSE 80

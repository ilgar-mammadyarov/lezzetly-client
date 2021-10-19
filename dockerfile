FROM node:14.1-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install

COPY . ./
RUN ng build

FROM nginx:1.17-alpine
COPY nginx.config /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/client /usr/share/nginx/html/client
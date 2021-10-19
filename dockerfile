FROM node:latest  as build-stage

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY ./ .
RUN npm run build


FROM nginx as production-stage
COPY nginx.config /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/client /usr/share/nginx/html/client
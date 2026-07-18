FROM node:26-alpine AS node
COPY ./ /app/
WORKDIR /app/

RUN npm install && npm run build

FROM nginx:1.31

RUN rm -rf /etc/nginx/conf.d/*
COPY --chown=root:root ./docker/app.conf /etc/nginx/conf.d/
COPY --from=node --chown=nginx:nginx /app/build/ /var/www/public/
RUN chmod -R a+rX /var/www/public/

CMD ["nginx", "-g", "daemon off;"]

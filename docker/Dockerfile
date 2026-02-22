FROM node:25-alpine AS node
COPY ./ /app/
WORKDIR /app/

RUN yarn install && yarn build

FROM nginx:1.29

RUN rm -rf /etc/nginx/conf.d/*
COPY --chown=root:root ./docker/app.conf /etc/nginx/conf.d/
COPY --from=node --chown=nginx:nginx /app/build/ /var/www/public/
RUN chmod -R a+rX /var/www/public/

CMD ["nginx", "-g", "daemon off;"]

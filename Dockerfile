# build environment
FROM node:13.10.1-stretch as builder
ARG environment=staging

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
COPY yarn.lock /usr/src/app/yarn.lock
RUN yarn install --silent
COPY . /usr/src/app
RUN yarn run build:$environment

# production environment
FROM nginx:1.17.9-alpine
RUN rm -rf /etc/nginx/conf.d && mkdir -p /etc/nginx/conf.d/
COPY conf/conf.d/prod.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/out /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

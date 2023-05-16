FROM node:18-alpine as builder

ARG REACT_APP_API_URL

ENV REACT_APP_API_URL=$REACT_APP_API_URL

WORKDIR /usr/src/app

RUN apk add --update python3 make g++\
   && rm -rf /var/cache/apk/*

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY . .

RUN yarn build

# Bundle static assets with nginx
FROM nginx:stable-alpine as production

ENV NODE_ENV production

COPY --from=builder /usr/src/app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

FROM node:18-alpine3.16

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY . .

RUN npx prisma generate

RUN yarn build

CMD [ "yarn", "run:docker" ]

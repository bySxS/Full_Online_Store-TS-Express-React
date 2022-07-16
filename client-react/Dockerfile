#копирует исходный код и запустите установку NPM
FROM node:alpine as builder

RUN apk update
RUN apk add nano mc

WORKDIR /usr/src/app
COPY package* ./
COPY src/ src/
COPY public/ public/
#COPY node_modules/ node_modules/
COPY .env .env
COPY tsconfig.json ./
COPY .eslintrc.json ./

RUN ["npm", "install"]

RUN ["npm", "run", "build"]
CMD ["npm", "run", "homepage"]


# Lints Code
#FROM node:alpine as linting
#WORKDIR /usr/src/app
#COPY — from=builder /usr/src .
#RUN ["npm", "eslint"]

# run the static code analyzer
#FROM node:alpine as sonarqube
#COPY — from=builder /usr/src /root/src
#WORKDIR /root/src/
#RUN ["npm", "sonar"]

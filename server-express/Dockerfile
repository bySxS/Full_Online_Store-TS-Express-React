#копирует исходный код и запустите установку NPM
FROM node:alpine as builder

RUN apk update
RUN apk add nano mc
#\
#    && apk add --update bash \
#    && apk add --update npm \
#    && apk add --no-cache --purge -uU redis \
#    && apk add git \
#    && apk add bash-completion

WORKDIR /usr/src/app
COPY package* ./
COPY src/ src/
COPY static/ static/
#COPY node_modules/ node_modules/
#COPY production.env ./src/.env
COPY production.env .env
COPY tsconfig.json ./
COPY .eslintrc.json ./
#RUN ["npm", "install", "-g", "npm@latest"]
RUN ["npm", "install"]
#RUN ["npm run migrate && npm run seedAdd"]
CMD ["/bin/bash"]
#CMD ["npm", "run", "prod"]



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

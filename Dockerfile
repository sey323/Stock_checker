FROM node:8
MAINTAINER Seiichirou Nomura

ENV APP_NAME Stock_checker
WORKDIR /home/$APP_NAME
ADD ./ /home/$APP_NAME

RUN npm install
RUN npm install -g cron

# cronの実行
CMD node main.js

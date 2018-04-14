FROM node:8
MAINTAINER Seiichirou Nomura

# クローンの追加
RUN apt-get update && apt-get install -y cron
# 設定ファイルの追加
ADD ./cron/stock_cron /etc/cron.d/stock_cron
RUN chmod 0644 /etc/cron.d/stock_cron

# 設定スクリプトの追加
ADD ./cron/node_cron.sh /node_cron.sh
RUN chmod +x /node_cron.sh

# 実行ディレクトリの定義
ENV APP_NAME Stock_checker
WORKDIR /home/$APP_NAME
ADD ./ /home/$APP_NAME

RUN npm install
RUN npm install -g cron

# cronの実行
# CMD cron && touch /etc/cron.d/stock_cron && tail -f /dev/null

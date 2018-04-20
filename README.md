# 概要
Googleの検索結果をスクレイピングして，株価を定期的にslackに通知するアプリ．

# ビルドと実行

dockerを利用している．

```
$ docker build -t rocket .
$ docker run -d --name rocket -it --rm rocket
```

## コンテナの停止

```
$ docker stop rocket
```

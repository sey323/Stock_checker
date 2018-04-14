//file_nameのjsonファイルの読み込み
exports.JsonUtil = function( file_name ){
    var fs = require('fs');

    this.file_name = file_name
    this.json = JSON.parse(fs.readFileSync(file_name , 'utf8') )

    //実行パラメータを取得
    this.get_param = function(){
        var data = this.json.param;
        return data;
    }

    //slackの情報を取得
    this.get_slack = function(){
        var data = this.json.slack;
        return data;
    }

    //会社の情報を取得
    this.get_stock = function(){
        var data = this.json.stock;
        return data;
    }
}

//独自ライブラリの呼び出し
var jsonUtil = require('../src/json_util.js')
var sp = require('../src/stock_price');

//キーの取得
var json = new jsonUtil.JsonUtil('config.json');

var stock = json.get_stock();
var companies = stock.companies;

// 会社の数だけ繰り返す．
companies.forEach( function( company ){
  var getVal = function( result ){
    var message = sp.slack_formatting( result );
  }
  var message = sp.getNowprice( company.name , getVal );
});

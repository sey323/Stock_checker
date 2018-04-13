exports.price_call = function(){

  //独自ライブラリの呼び出し
  var jsonUtil = require('./json_util.js')
  var sp = require('./stock_price');

  //キーの取得
  var json = new jsonUtil.JsonUtil('config.json');
  var param = json.get_param();
  var slack_param = json.get_slack();
  var stock = json.get_stock();
  var companies = stock.companies;

  //Slackコールの呼び出し
  var slack = require('./slack.js');
  var slack = new slack.Slack( slack_param.url );

  //定期実行
  companies.forEach( function( company ){
    var getVal = function( result ){
      var message = sp.slack_formatting( result );
      slack.say_message( message );
    }
    var message = sp.getNowprice( company.name , getVal );
  });
}

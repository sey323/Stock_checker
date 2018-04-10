exports.price_call = function(){
  var async = require('async');

  //独自ライブラリの呼び出し
  var jsonUtil = require('./json_util.js')
  var sp = require('./stock_price');

  //キーの取得
  var json = new jsonUtil.JsonUtil('config.json');
  var param = json.get_param();
  var slack_param = json.get_slack();

  //Slackコールの呼び出し
  var slack = require('./slack.js');
  var slack = new slack.Slack( slack_param.url );


  //定期実行
  setInterval(function(){
    var company = "KDDI";
    var getVal = function( result ){
      console.log( "getval" );
      var message = sp.slack_formatting( result );
      slack.say_message( message );
    }

    var message = sp.getNowprice( company , getVal );
  } , param.second * 1000);
}

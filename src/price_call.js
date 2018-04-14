exports.price_call = function( companies ){
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

  // 会社の数だけ繰り返す．
  companies.forEach( function( company ){
    var getVal = function( result ){
      var message = sp.slack_formatting( result );
      slack.say_message( message );
    }
    var message = sp.getNowprice( company.name , getVal );
  });
}

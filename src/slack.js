var Botkit = require('botkit');
// Cronの読み込み
var CronJob = require('cron').CronJob;

//独自ライブラリの呼び出し
var jsonUtil = require('./json_util.js')
var sp = require('./stock_price');

//slackモジュール
exports.Slack = function(){
  const controller = Botkit.slackbot({
    debug: false
  });

  //キーの取得
  var json = new jsonUtil.JsonUtil('config.json');
  var slack_param = json.get_slack();
  var stock = json.get_stock();
  var companies = stock.companies;

  // 初期化
  controller.spawn({
    token: slack_param.token
  }).startRTM(function(err, bot, payload) {
    new CronJob({
      //cronTime: '* * * * *',
      cronTime:'00,30 8-16 * * 0-7',
      onTick: function() {

        // 会社の数だけ繰り返す．
        companies.forEach( function( company ){
          var getVal = function( result ){
            var message = sp.slack_formatting( result );
            bot.say( {
              text:message,
              channel: 'virtual-currency'
            } );
          }
          var message = sp.getNowprice( company.name , getVal );
        });
      },
      start: true,
      timeZone: 'Asia/Tokyo'
    });
  });

  // 会社の名前を入力したら，その株価を返信
  controller.hears('(.*)',['direct_message'],function( bot , message) {
    var sp = require('./stock_price');
    bot.reply( message , message.text + 'の株価を検索してるぜ！' );
    
    var getVal = function( company ){
      var value = sp.slack_formatting( company );
      // 存在しない企業の時
      if( value == null ){
        bot.reply( message , 'そんな企業ないぞ' );
      }else{
        bot.reply( message , value );
      }
    }
    var tmp = sp.getNowprice( message.text , getVal );
  });
}

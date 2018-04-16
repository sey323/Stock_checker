
//slackモジュール
exports.Slack = function( token ){
  var Botkit = require('botkit');

  const controller = Botkit.slackbot({
    debug: false
  });

  // 初期化
  controller.spawn({
      token: token
  }).startRTM(function(err){
      if (err) {
          throw new Error(err);
      }
  });

  controller.hears('(.*)',['direct_message','direct_mention','mention'],function(bot,message) {
    var sp = require('./stock_price');
    var getVal = function( result ){
      var value = sp.slack_formatting( result );
      bot.leply( message , value );
    }
    var message = sp.getNowprice( company.name , getVal );
  });

  this.say_message = function( message ){
    controller.spawn({
      token: token
    }).startRTM(function(err, bot, payload) {
      // チャンネル等を指定
      bot.say({
        channel: 'virtual-currency',
        text: message,
        username: 'rocket'
      });
      // --
    });
  }
}

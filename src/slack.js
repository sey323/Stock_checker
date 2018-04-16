
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

  controller.hears('(.*)',['direct_message'],function( bot , message) {
    bot.reply( message , message.text + 'の株価を検索してるぜ！' );

    var sp = require('./stock_price');
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

  // チャンネルに定期発信
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

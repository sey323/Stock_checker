
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
    var pc = require('./price_call.js');
    console.log( message );
    pc.price_call( message.text );
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

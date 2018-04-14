
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


//slackモジュール
exports.Slack = function( token ){
  var request = require('request');
  var Botkit = require('botkit');

  const controller = Botkit.slackbot({
    debug: false
  });

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
      // Add --
      bot.say({
        channel: 'virtual-currency',
        text: message,
        username: 'rocket'
      });
      // --
    });
  }
}

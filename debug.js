// Cronの読み込み
var CronJob = require('cron').CronJob;
// 自作ファイルの読み込み
var pc = require('./src/price_call.js');
var jsonUtil = require('./src/json_util.js')

var json = new jsonUtil.JsonUtil('config.json');
var stock = json.get_stock();
var slack_param = json.get_slack();

//Slackコールの呼び出し
var slack = require('./src/slack.js');
var slack = new slack.Slack( slack_param.token );

new CronJob({
    cronTime: '* * * * *',
    onTick: function() {
      var companies = stock.companies;
      pc.price_call( companies );
    },
    start: true,
    timeZone: 'Asia/Tokyo'
});

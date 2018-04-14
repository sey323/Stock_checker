// Cronの読み込み
var CronJob = require('cron').CronJob;
// 自作ファイルの読み込み
var pc = require('./src/price_call.js');
var jsonUtil = require('./src/json_util.js');

var json = new jsonUtil.JsonUtil('config.json');
var stock = json.get_stock();

new CronJob({
    cronTime:'00,30 8-16 * * 0-7',
    onTick: function() {
      var companies = stock.companies;
      pc.price_call( companies );
    },
    start: true,
    timeZone: 'Asia/Tokyo'
});

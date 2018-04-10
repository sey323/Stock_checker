
//slackモジュール
exports.Slack = function( url ){
    var request = require('request');


    this.say_message = function( message ){
        var payload = JSON.stringify({
            "text": message,
            "username": "Rocket",
            "icon_url": "",
            "channel": "#virtual-currency"
        });

        var options = {
            url: url,
            form: 'payload=' + payload,
            json: true
        };

        request.post(options, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            } else {
                console.log('error: ' + response.statusCode + body);
            }
        });
    }
}

var cheerioClient = require('cheerio-httpcli');

/*
 *検索をかける
 */
var searchClearly = function( url, request, clearly ){
  var promiseCheerio = cheerioClient.fetch( url, request );

  return new Promise(function (resolve, reject) {
    promiseCheerio.then( function( cheerioResult ){
      if( cheerioResult.error ){
        reject( cheerioResult.error );
      }else{
        var $ = cheerioResult.$;
        resolve({
          "clearlyList" : clearly( $ ),
          "cheerioJQuery" : $
        });
      }
    }, function( error ){
      reject( error );
    });
  });
}

/*
 * 会社名から株価を取得
 */
exports.getNowprice = function( company , callback ){
  var request = { q: company + " 株価" };
  var result = '';
  searchClearly( "http://www.google.com/search", request, function( $ ){
    var target = $("div[id='fac-ut']");
    // 要素を取得
    var name = target.find("div[ class = 'vk_gy spEdqf vk_h' ]");
    var change_amount = target.find("span[ class='fac-cc']");
    var stock_price = target.find("span[ class='W0pUAc fmob_pr fac-l']");
    var table = target.find("table[class='ts']").eq();

    result = {
      name: name.text(),
      stock_price: stock_price.text(),
      change_amount: change_amount.text()
    }
    callback( result );
  });
};

/*
 *slackの出力用に修正
 */
exports.slack_formatting = function( text ) {
  var formatted_text ="";

  formatted_text +=
  ">`" + text.name + "` の現在の株価\n" +
  ">*" + text.stock_price + "* 円\n"+
  ">" + "_変化量:" + text.change_amount + "_";

  return formatted_text;
};

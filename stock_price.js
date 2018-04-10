
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
var getNowprice = function( company ){
  var request = { q: company + " 株価" };
  searchClearly( "http://www.google.com/search", request, function( $ ){
    var target = $("div[id='fac-ut']");
    // 要素を取得
    var change_amount = target.find("span[ class='fac-cc']");
    var stock_price = target.find("span[ class='W0pUAc fmob_pr fac-l']");
    var table = target.find("table[class='ts']").eq();

    var result = {
      stock_price: stock_price.text(),
      change_amount: change_amount.text()
    }

    console.log(result);
    return result;
  });
};


var price = getNowprice( "ヤフー" );

// 楽天証券にログイン

var BBS_USER = "JS-TESTER";
var BBS_PASS = "ipCU12ySxI";

// Chapterjsの読み込み
var casper = require('casper').create();
casper.start();

//ログインページを開く
casper.open("");

// ログインする．
casper.then( function() {
  this.fill("input#form-login",{
    username_mmlbbs6: BBS_USER,
    password_mmlbbs6: BBS_PASS
  } , true );
});

// マイページを開く
casper.then( function(){
  var getLink = function() {
    var q = document.querySelector('#header_menu_linkbar a');
    return q.href;
  };
  var mypage_url = this.evaluate( getLink );
  this.echo("mypage url=" + mypage_url);
  this.open( mypage_url );
});

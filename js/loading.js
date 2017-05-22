'use strict';

ajaxRequest('GET', 'php/request.php/module/header', loadHtmlAndJs);
console.log($.cookie('login'));
if($.cookie==''){

}else
  ajaxRequest('GET', 'php/request.php/module/mon_compte', loadHtmlAndJs);

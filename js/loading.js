'use strict';

ajaxRequest('GET', 'php/request.php/module/header', loadHtmlAndJs);
$.cookie('cookie', 'false');
if($.cookie('cookie')!='true'){
  alert("En utilisant notre site internet, vous acceptez l'utilisation de cookies");
  $.cookie('cookie', 'true');
}

console.log($.cookie('login'));
if($.cookie==''){

}else
  ajaxRequest('GET', 'php/request.php/module/mon_compte', loadHtmlAndJs);

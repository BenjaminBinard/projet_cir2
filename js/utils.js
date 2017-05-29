'use strict';

function ajaxRequest(type, request, callback, data=null){
  var xhr;
  xhr = new XMLHttpRequest();
  if(type=='GET'){
    request += '?' + data;
  }
  if(type=='PUT'){
    request += '?' + data;
  }
  xhr.open(type, request, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function(){
    if(xhr.readyState != 4)
    return;
    switch(xhr.status){
      case 200:
      callback(xhr.responseText);
      break;
      case 404:
      httpErrors(404);
      case 400:
      httpErrors(400);
      default:
      console.log('Http Error : '+xhr.status);
    }
  };
  xhr.send(data);
}

function mfCallback(word){
  console.log(word);
}

function httpErrors(errorNumber){
  var reponse;
  switch (errorNumber) {
    case 404:
    reponse="<div class='alert alert-danger container'><span class='glyphicon glyphicon-remove-sign' aria-hidden='true'></span><strong> Désolé ! </strong>Page non trouvée.</div>";
    break;
    case 400:
    reponse="<div class='alert alert-danger container'><span class='glyphicon glyphicon-remove-sign' aria-hidden='true'></span><strong> Désolé ! </strong>Requete éronnée.</div>";
    break;
    default:
    console.log('Http Error : '+xhr.status);
  }
  document.getElementById('errors').innerHTML= reponse;
}

function loadHtmlAndJs(ajaxResponse){
  var data;
  console.log(ajaxResponse);
  data = JSON.parse(ajaxResponse);
  $('#'+data.divId).load(data.html);
  $.getScript(data.js);
}

function contour_rouge(element){
  element.setAttribute('style', 'border-top:2px solid red;border-bottom:2px solid red;border-left:2px solid red;border-right:2px solid red;');
}

function contour_vert(element){
  element.setAttribute('style', 'border-top:2px solid green;border-bottom:2px solid green;border-left:2px solid green;border-right:2px solid green;');
}

function verification_mail(mail, type){
  var bool_mail;
  var regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
  if(type==1){
    if(!regex.test(mail.value)){
      contour_rouge(mail);
      bool_mail='FALSE';
    }
    else{
      contour_vert(mail);
      bool_mail='TRUE';
    }
  }
  if(type==2){
    if(!regex.test(mail)){
      bool_mail='FALSE';
    }
    else{
      bool_mail='TRUE';
    }
  }
  return bool_mail;
}

function sleep(ms) {
  console.log("ECHO");
  return new Promise(resolve => setTimeout(resolve, ms));
}

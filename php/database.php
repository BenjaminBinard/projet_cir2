<?php
session_start();
include"../database_conf.php";

function dbConnect(){
  try{
    $db=new PDO('mysql:host='.DB_SERVER.';dbname='.DB_NAME,DB_USER,DB_PASSWORD);
    $db->exec("SET NAMES utf8");
  }
  catch (PDOException $exception){
    return false;
  }
  return $db;
}

function execute_request_add($request){
  $db=dbConnect();
  $db->exec($request);
}

function execute_request_get($request){
  $db=dbConnect();
  $statement=$db->prepare($request);
  $statement->execute();
  $result=$statement->fetchALL(PDO::FETCH_ASSOC);
  return $result;
}

function inscription($nom,$prenom,$mail,$password){
  $request="INSERT INTO USER (MAIL_USER, LASTNAME, FIRSTNAME, PASS) VALUES ('$mail','$nom','$prenom','$password')";
  execute_request_add($request);
}

function connexion($mail,$password){
  $result=execute_request_get("select MAIL_USER, PASS from USER");
  $connecte='FALSE';
  for($i=0;$i<sizeof($result);$i++){
    if($result[$i]["MAIL_USER"]==$mail && $result[$i]["PASS"]==$password)
      $connecte='TRUE';
  }
  if($connecte=='TRUE')
      return 'TRUE';
  else
    return 'FALSE';
}

function infosUpdate($donnees, $table, $column){
  $request="UPDATE $table SET $column = '$donnees' WHERE MAIL_USER="."'".$_SESSION['mail']."'";
  execute_request_add($request);
}

function mes_donnees($mail){
  $request="SELECT LASTNAME,FIRSTNAME FROM USER WHERE MAIL_USER='$mail'";
  $result=execute_request_get($request);
  $result[0]['mail']=$mail;
  return $result;
}

function data_chart($type, $nbr){
  if($type=='CO2')
    $request="SELECT NUM,DTIME FROM `VALUE` WHERE TYPE=2 ORDER BY DTIME DESC LIMIT $nbr";
  if($type=='humidite')
    $request="SELECT NUM,DTIME FROM `VALUE` WHERE TYPE=3 ORDER BY DTIME DESC LIMIT $nbr";
  if($type=='temperature')
    $request="SELECT NUM,DTIME FROM `VALUE` WHERE TYPE=4 ORDER BY DTIME DESC LIMIT $nbr";
  $result=execute_request_get($request);
  return $result;
}

function db_recup_taux($type){
  if($type=='CO2')
    $request="SELECT NUM FROM `VALUE` WHERE TYPE=2 ORDER BY DTIME DESC LIMIT 1";
  if($type=='humidite')
    $request="SELECT NUM FROM `VALUE` WHERE TYPE=3 ORDER BY DTIME DESC LIMIT 1";
  if($type=='temperature')
    $request="SELECT NUM FROM `VALUE` WHERE TYPE=4 ORDER BY DTIME DESC LIMIT 1";
  if($type=='four')
    $request="SELECT CAR FROM `VALUE` WHERE TYPE=7 ORDER BY DTIME DESC LIMIT 1";
  if($type=='tv')
    $request="SELECT CAR FROM `VALUE` WHERE TYPE=6 ORDER BY DTIME DESC LIMIT 1";
  if($type=='utilisateurs')
    $request="SELECT CAR FROM `VALUE` WHERE TYPE=5 ORDER BY DTIME DESC LIMIT 1";
  if($type=='pas')
    $request="SELECT NUM FROM `VALUE` WHERE TYPE=8 ORDER BY DTIME DESC LIMIT 1";
  $result=execute_request_get($request);
  return $result;
}

function db_recup_mdp($mail){
  $request="SELECT PASS FROM USER WHERE MAIL_USER='$mail'";
  $result=execute_request_get($request);
  return $result;
}

function db_recup_alerte(){
  $request="SELECT DTIME, DETAIL FROM ALERT WHERE DTIME=(SELECT MAX(DTIME) FROM ALERT)";
  $result=execute_request_get($request);
  return $result;
}

function db_get_time(){
  $request="SELECT MAX(DTIME) FROM VALUE";
  $result=execute_request_get($request);
  return $result;
}

function db_recup_user(){
  $request="SELECT MAIL_USER,ID_ROOM FROM USER_ROOM";
  $result=execute_request_get($request);
  return $result;
}

function db_recup_contact($mail){
  $request="SELECT MAIL_CONTACT, MAIL_USER FROM `USER_SUPERVISOR` WHERE MAIL_USER='$mail'";
  $result=execute_request_get($request);
  return $result;
}

function db_ajout_user($mail,$salle){
  $request="SELECT MAIL_USER FROM USER";
  $result=execute_request_get($request);
  $request="SELECT COUNT(MAIL_USER) FROM USER";
  $result2=execute_request_get($request);
  for($i=0;$i<$result2[0]['COUNT(MAIL_USER)'];$i++){
    if($result[$i]['MAIL_USER']==$mail){
      $request="INSERT INTO `USER_ROOM` (`ID_ROOM`, `MAIL_USER`, `START`, `END`) VALUES ('$salle','$mail', NULL, NULL);";
      execute_request_add($request);
      return $request;
    }else {
      $test='FALSE';
    }
  }
  return 'FALSE';
}

function db_suppression_mail_contact($mail_contact,$mail_user){
  $request="DELETE FROM `USER_SUPERVISOR` WHERE MAIL_USER='$mail_user' AND MAIL_CONTACT='$mail_contact'";
  execute_request_add($request);
  return 'TRUE';
}

function db_ajouter_contact($mail_contact,$mail_user){
  $request="INSERT INTO `USER_SUPERVISOR` (`MAIL_USER`, `MAIL_CONTACT`, `ID_MAIL_CONTACT`) VALUES ('$mail_user', '$mail_contact', NULL)";
  execute_request_add($request);
  return 'TRUE';
}

function db_suppression_supervise($mail){
  $request="DELETE FROM `USER_ROOM` WHERE MAIL_USER='$mail'";
  execute_request_add($request);
  return 'TRUE';
}
?>

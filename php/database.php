<?php
session_start();

define('DB_USER','equipe');
define('DB_PASSWORD','coucou');//A modifier par "toor" une fois sur la VM
define('DB_NAME','isen_lab');
define('DB_SERVER','localhost');

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

function inscription($nom,$prenom,$mail,$password){
  $db=dbConnect();
  $request="INSERT INTO USER (MAIL_USER, LASTNAME, FIRSTNAME, PASS) VALUES ('$mail','$nom','$prenom','$password')";
  $db->exec($request);
}

function connexion($mail,$password){
  $db=dbConnect();
  $request="select MAIL_USER, PASS from USER";
  $statement=$db->prepare($request);
  $statement->execute();
  $result=$statement->fetchALL(PDO::FETCH_ASSOC);
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
  $db=dbConnect();
  $request="UPDATE $table SET $column = '$donnees' WHERE MAIL_USER="."'".$_SESSION['mail']."'";
  $db->exec($request);
  return $request;
}

function mes_donnees($mail){
  $db=dbConnect();
  $request="SELECT LASTNAME,FIRSTNAME FROM USER WHERE MAIL_USER='$mail'";//$mail;
  $statement=$db->prepare($request);
  $statement->execute();
  $result=$statement->fetchALL(PDO::FETCH_ASSOC);
  $result[0]['mail']=$mail;
  return $result;
}

function data_chart($type, $nbr){
  $db=dbConnect();
  if($type=='CO2')
    $request="SELECT NUM,DTIME FROM `VALUE` WHERE TYPE=2 ORDER BY DTIME DESC LIMIT $nbr";
  if($type=='humidite')
    $request="SELECT NUM,DTIME FROM `VALUE` WHERE TYPE=3 ORDER BY DTIME DESC LIMIT $nbr";
  if($type=='temperature')
    $request="SELECT NUM,DTIME FROM `VALUE` WHERE TYPE=4 ORDER BY DTIME DESC LIMIT $nbr";
  $statement=$db->prepare($request);
  $statement->execute();
  $result=$statement->fetchALL(PDO::FETCH_ASSOC);
  return $result;
}

function db_recup_taux($type){
  $db=dbConnect();
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
  $statement=$db->prepare($request);
  $statement->execute();
  $result=$statement->fetchALL(PDO::FETCH_ASSOC);
  return $result;
}

function db_recup_mdp($mail){
  $db=dbConnect();
  $request="SELECT PASS FROM USER WHERE MAIL_USER='$mail'";
  $statement=$db->prepare($request);
  $statement->execute();
  $result=$statement->fetchALL(PDO::FETCH_ASSOC);
  return $result;
}

function db_recup_alerte(){
  $db=dbConnect();
  $request="SELECT DTIME, DETAIL FROM ALERT WHERE DTIME=(SELECT MAX(DTIME) FROM ALERT)";
  $statement=$db->prepare($request);
  $statement->execute();
  $result=$statement->fetchALL(PDO::FETCH_ASSOC);
  return $result;
}

function db_get_time(){
  $db=dbConnect();
  $request="SELECT MAX(DTIME) FROM VALUE";
  $statement=$db->prepare($request);
  $statement->execute();
  $result=$statement->fetchALL(PDO::FETCH_ASSOC);
  return $result;
}

function db_recup_user(){
  $db=dbConnect();
  $request="SELECT MAIL_USER,ID_ROOM FROM USER_ROOM WHERE ID_ROOM=1";
  $statement=$db->prepare($request);
  $statement->execute();
  $result=$statement->fetchALL(PDO::FETCH_ASSOC);
  return $result;
}

function db_recup_contact($mail){
  $db=dbConnect();
  $request="SELECT MAIL_CONTACT, MAIL_USER FROM `USER_SUPERVISOR` WHERE MAIL_USER='$mail'";
  $statement=$db->prepare($request);
  $statement->execute();
  $result=$statement->fetchALL(PDO::FETCH_ASSOC);
  return $result;
}

function db_ajout_user($mail,$salle){
  $db=dbConnect();
  $request="SELECT MAIL_USER FROM USER";
  $statement=$db->prepare($request);
  $statement->execute();
  $result=$statement->fetchALL(PDO::FETCH_ASSOC);
  for($i=0;$i<6;$i++){
    if($result[$i]['MAIL_USER']==$mail){
      $request="INSERT INTO `USER_ROOM` (`ID_ROOM`, `MAIL_USER`, `START`, `END`) VALUES ('$salle','$mail', NULL, NULL);";
      $db->exec($request);
      return $request;
    }else {
      $test='FALSE';
    }
  }
  return 'FALSE';
}

function db_suppression_mail_contact($mail_contact,$mail_user){
  $db=dbConnect();
  $request="DELETE FROM `USER_SUPERVISOR` WHERE MAIL_USER='$mail_user' AND MAIL_CONTACT='$mail_contact'";
  $db->exec($request);
  return 'TRUE';
}

function db_ajouter_contact($mail_contact,$mail_user){
  $db=dbConnect();
  $request="INSERT INTO `USER_SUPERVISOR` (`MAIL_USER`, `MAIL_CONTACT`, `ID_MAIL_CONTACT`) VALUES ('$mail_user', '$mail_contact', NULL)";
  $db->exec($request);
  return 'TRUE';
}

?>

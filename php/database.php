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

function getGraph($type){
  //$myData = new pData();
  //$myData->addPoints(array(VOID,3,4,3,5));
}

function data_chart($type){
  $db=dbConnect();
  if($type=='CO2')
    $request="SELECT NUM, DTIME FROM `VALUE` WHERE TYPE='2' AND BETWEEN \'MAX(TYPE)\' AND \'MAX(TYPE)-15\'";
  if($type=='humidite')
    $request="SELECT NUM, DTIME FROM `VALUE` WHERE TYPE='3'";
  if($type=='temperature')
    $request="SELECT NUM, DTIME FROM `VALUE` WHERE TYPE='4'";
  $statement=$db->prepare($request);
  $statement->execute();
  $result=$statement->fetchALL(PDO::FETCH_ASSOC);
  return $result;
}

?>

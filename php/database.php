<?php
session_start();
define('DB_USER','equipe');
define('DB_PASSWORD','coucou');
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

function test(){
  $db=dbConnect();
  $request="select * from user";
  $statement=$db->prepare($request);
  $statement->execute();
  $result=$statement->fetchALL(PDO::FETCH_ASSOC);
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
  if($connecte=='TRUE'){
      return 'TRUE';
  }
  else
    return 'FALSE';
}
?>

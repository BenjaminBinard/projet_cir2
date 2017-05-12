<?php
include'constants.php';
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

function dbRequestPolls($db, $id = -1, $login = ''){
  try{
    $request="select * from polls";
    if($id!=-1){
      $request.=" where id=:id";
    }
    if($login!=''){
      $request.=" where login=:login";
    }
    $statement=$db->prepare($request);
    if($id!=-1){
      $statement->bindParam(":id",$id,PDO::PARAM_INT);
    }
    if($login!=''){
      $statement->bindParam(':login',$login,PDO::PARAM_STR,20);
    }
    $statement->execute();
    $result=$statement->fetchALL(PDO::FETCH_ASSOC);
  }
  catch(PDOException $exception){
    return false;
  }
  return $result;
}
?>

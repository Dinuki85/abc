<?php 

session_start();

require "connection.php";
$se = $_POST['s'];
$ind = $_POST["i"];
$fname = $_POST["f"];
$initials = $_POST["it"];
$specialneed = $_POST["sn"]; 
$paddress = $_POST["paddress"];
$taddress = $_POST["taddress"];
$emno = $_POST["emno"];
$wtno = $_POST["wtno"];
$hmno = $_POST["hmno"];
$mbno = $_POST["mbno"];

// echo $ind;
// echo $fname;
// echo $initials;
// echo $specialneed;
// echo $birthday;
// echo $paddress;
// echo $taddress;
// echo $emno;
// echo $wtno;
// echo $hmno;
// echo $mbno;

Database::iud("DELETE FROM `student` WHERE `index`='".$ind."'");

echo "SUCCESS";
?>
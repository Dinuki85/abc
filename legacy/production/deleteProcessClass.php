<?php 

session_start();

require "connection.php";
$se = $_POST['s'];
$id = $_POST["i"];
$classname = $_POST["c"];

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

Database::iud("DELETE FROM `class` WHERE `id`='".$id."'");

echo "SUCCESS";
?>
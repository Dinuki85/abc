<?php 

session_start();

require "connection.php";
$club_id = $_POST["cl"];
$position = $_POST["pos"];

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

Database::iud("DELETE FROM `co_curricular` WHERE `club_id`='".$club_id."'");

echo "SUCCESS";
?>
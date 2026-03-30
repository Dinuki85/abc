<?php 

session_start();

require "connection.php";

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

if(empty($id)){
    echo ("id no is empty");
}else{
    $rs = Database::search("SELECT * FROM `class` WHERE `id`='".$id."' OR `class_name`='".$classname."'");
    $n = $rs->num_rows;

    if($n > 0){
        Database::iud("UPDATE `class` SET `class_name` = '".$classname."' WHERE `class`.`id` ='".$id."'");
        echo("SUCCESS");
    }
}

?>
<?php 

session_start();
require "connection.php";

$id = $_POST["i"];
$classname = $_POST["c"];

if(empty($id)){
    echo ("id no is empty");
}elseif(strlen($id)>45){
    echo("id is to Long");
}elseif(empty($classname)){
    echo ("Class Name is Empty");
}elseif(strlen($classname)>45){
    echo("Class Name is too long");
}else{
    $rs = Database::search("SELECT * FROM `class` WHERE `id`='".$id."' OR `class_name`='".$classname."'");
    $n = $rs->num_rows;

    if($n > 0){
        echo("Class Already Exsist");
    }else{
        Database::iud("INSERT INTO `class` (`id`,`class_name`)VALUES('".$id."','".$classname."') ");
        echo("1");
    }
}

?>
<?php 

require "connection.php";

$club_id = $_POST["cl"];
$position = $_POST["pos"];

// echo $club_id;
// echo $coach_id;
// echo $stin;
// echo $stdid;
// echo $position;

if(empty($club_id)){
    echo "Insert a Club ID";
}else if(empty($coach_id)){
    echo "Enter Your Coach ID";
}else if(empty($stin)){
    echo ("Please enter Your Student Index");
}else if(empty($position)){
    echo "Please Your Position";
}else{

    $rs = Database::search("SELECT * FROM `co_curricular` WHERE `club_id`='".$club_id."'");
    $n = $rs->num_rows;

    if($n > 0){
        Database::iud("UPDATE `co_curricular` SET `position` = '".$position."' WHERE `co_curricular`.`club_id` ='".$club_id."'");
    }

}

?>
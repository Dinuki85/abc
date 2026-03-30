<?php 

require "connection.php";

$club_id = $_POST["cl"];
$coach_id = $_POST["co"];
$stin = $_POST["sin"];
$stdid = $_POST["std"];
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
    $club_rs = Database::search("SELECT * FROM `co_curricular` WHERE `club_id`='".$club_id."'");
    $n = $club_rs->num_rows;

    if($n > 0 ){
        echo ("User Already exsist");
    }else{
        Database::iud("INSERT INTO `co_curricular`(`club_id`,`coach_id`,`std_index`,`position`)
        VALUES ('".$club_id."','".$coach_id."','".$stin."','".$position."')");

         $club2_rs = Database::search("SELECT * FROM `co_curricular` WHERE `club_id`='".$club_id."'");
         $cn = $club2_rs->fetch_assoc();

         $stu=Database::search("SELECT * FROM `student` WHERE `index`='".$stin."'");
         $stu_rs= $stu->fetch_assoc();
        Database::iud("INSERT INTO `co_curricular_has_student` (`co_curricular_idco_curricular`,`student_idstudent`) VALUES ('".$cn['id']."','".$stu_rs['id']."')");


        echo("Success");
    }
}
?>
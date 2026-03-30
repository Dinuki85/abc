<?php 

require "connection.php";

$nic = $_POST["n"];
$name = $_POST["na"];
$std = $_POST["st"];
$job = $_POST["j"];
$rela = $_POST["r"];

// echo $club_id;
// echo $coach_id;
// echo $stin;
// echo $stdid;
// echo $position;

if(empty($nic)){
    echo "Insert a Nic";
}else if(empty($name)){
    echo "Enter Your Name";
}else if(empty($job)){
    echo ("Enter Your JOB");
}else if(empty($rela)){
    echo("Please Enter RelationShip");
}else{
    $stu=Database::search("SELECT * FROM `student` WHERE `idstudent`='".$std."'");
    $std_rs=$stu->fetch_assoc();
    $parent = Database::search("SELECT * FROM `parents` WHERE `nic``='".$nic."' AND `std_id`='".$std_rs['index']."'");
    $n = $parent->num_rows;

    if($n > 0 ){
        echo ("User Already exsist");
    }else{
        Database::iud("INSERT INTO `parent`( `nic`,`name`,`std_id`,`job`,`relationship`)
        VALUES ('".$nic."','".$name."','".$std."','".$job."','".$rela."');");
         $parent = Database::search("SELECT * FROM `parents` WHERE `nic``='".$nic."' AND `std_id`='".$std_rs['index']."'");
         $p_d=$parent->fetch_assoc();

         $stu=Database::search("SELECT * FROM `student` WHERE `idstudent`='".$std."'");
    $std_rs=$stu->fetch_assoc();

            Database::iud("INSERT INTO `student_has_parent`(`student_idstudent`,`parent_idparent`)VALUES('".$p_d['idparent']."','".$std_rs['idstudent']."') ");

        echo("Success");    
    }
}
?>
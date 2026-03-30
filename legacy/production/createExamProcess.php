<?php
require "connection.php";

$examid = $_POST["exam_id"];
$school = $_POST["school"];
$classid = $_POST["class_id"];
$teacher = $_POST["teacher"];
$goverment = $_POST["government"];


if(empty($examid)){
    echo ("Enter the exam ID");
} elseif(empty($school)){
    echo "Enter the school name";
} elseif(empty($classid)){
    echo("Enter the class ID");
} elseif(empty($teacher)){
    echo ("Please enter the teacher's name");
} elseif(empty($goverment)){
    echo("Please enter the government name");
}else{
    $rs = Database::search("SELECT * FROM `exams` WHERE `exam_id`='".$examid."'");
    $n = $rs->num_rows;
    if($n > 0){
        echo("Exam Already exist");
    }else{
        Database::iud("INSERT INTO `exams`(`exam_id`,`school`,`class_id`,`teacher`,`gov`)
        VALUES('".$examid."','".$school."','".$classid."','".$teacher."','".$goverment."')");

        echo("Success");
    }
}

?>
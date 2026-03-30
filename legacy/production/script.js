function login() {

    var email = document.getElementById("em1");
    var password = document.getElementById("pw1");


    var form = new FormData();
    form.append("e", email.value);
    form.append("p", password.value);

    var sd = new XMLHttpRequest();

    sd.onreadystatechange = function () {
        if (sd.readyState == 4 && sd.status == 200) {
            var text = sd.responseText;

            if (text == "Success") {
                window.location = "index.php";
            } else {
                alert("User Name or Password is incorrect");
            }

        }
    }

    sd.open("POST", "loginProcess.php", true);
    sd.send(form);

}

function createStudent() {
    var ind = document.getElementById("ind").value;
    var fullname = document.getElementById("fullname").value;
    var initial = document.getElementById("initial").value;
    var specialneed = document.getElementById("specialneed").value;
    var birthday = document.getElementById("birthday").value;
    var paddress = document.getElementById("paddress").value;
    var taddress = document.getElementById("taddress").value;
    var emno = document.getElementById("emno").value;
    var wtno = document.getElementById("wtno").value;
    var hmno = document.getElementById("hmno").value;
    var mbno = document.getElementById("mbno").value;

    var f = new FormData();

    f.append("i", ind);
    f.append("f", fullname);
    f.append("it", initial);
    f.append("sn", specialneed);
    f.append("bd", birthday);
    f.append("paddress", paddress);
    f.append("taddress", taddress);
    f.append("emno", emno);
    f.append("wtno", wtno);
    f.append("hmno", hmno);
    f.append("mbno", mbno);

    var cst = new XMLHttpRequest();
    cst.onreadystatechange = function () {
        if (cst.readyState == 4 && cst.status == 200) {
            var t = cst.responseText;
            if(t == "SUCCESS"){
                alert("Success");
            }else{
                alert(t);
            }
        }
    }
    cst.open("POST", "createStudentProcess.php", true);
    cst.send(f);
}

function createClass(){
    var idc = document.getElementById("ind").value;
    var classname = document.getElementById("clname").value;

    var form = new FormData();
    form.append("i",idc);
    form.append("c",classname);

    var cc = new XMLHttpRequest();
    cc.onreadystatechange = function(){
        if(cc.readyState == 4 && cc.status == 200){
            var t = cc.responseText;
            if(t == "Success"){
                alert("Success");
            }else{
                alert(t);
            }
        }
    }
    cc.open("POST", "createClassProcess.php",true);
    cc.send(form);
}

function createStaff(){

    var ids = document.getElementById("ind").value;
    var name = document.getElementById("name").value;
    var salary = document.getElementById("salary").value;
    var cat = document.getElementById("clr").value;
    var birthday = document.getElementById("birthday").value;
    var paddress = document.getElementById("paddress").value;
    var taddress = document.getElementById("taddress").value;
    var emno = document.getElementById("emno").value;
    var wtno = document.getElementById("wtno").value;
    var hmno = document.getElementById("hmno").value;
    var mbno = document.getElementById("mbno").value;
    var email = document.getElementById("em").value;

    // alert(name);
    // alert(salary);
    // alert(birthday);
    // alert(cat);
    // alert(paddress);
    // alert(taddress);
    // alert(emno);
    // alert(wtno);
    // alert(hmno);
    // alert(mbno);    

    var form = new FormData();
    form.append("in",ids)
    form.append("n",name);
    form.append("s",salary);
    form.append("c",cat);
    form.append("b",birthday);
    form.append("p",paddress);
    form.append("t",taddress);
    form.append("e",emno);
    form.append("w",wtno);
    form.append("h",hmno);
    form.append("m",mbno);
    form.append("el",email);

    var st = new XMLHttpRequest();
    st.onreadystatechange = function(){
        if(st.readyState == 4 && st.status == 200){
            var t = st.responseText;
            if(t == "Success"){
                alert("Success")
            }else{
                alert(t);
            }
        }
    }
    st.open("POST","createStaffProcess.php",true);
    st.send(form);
}

function co(){
    var clubid = document.getElementById("clubid").value;
    var coachid = document.getElementById("coachid").value;
    var stdindex = document.getElementById("stdindex").value;

    var pos = document.getElementById("pos").value;



    var form = new FormData();
    form.append("cl",clubid);
    form.append("co",coachid);
    form.append("sin",stdindex);
    form.append("pos",pos);

    var coc = new XMLHttpRequest()

    coc.onreadystatechange = function(){
        if(coc.readyState == 4 && coc.status == 200){
            var t = coc.responseText;
            alert(t);
        }
    }

    coc.open("POST","createCocircularprocess.php",true);
    coc.send(form);
}

function cStPro(){
    var nic = document.getElementById("nic").value;
    var name = document.getElementById("name").value;
    var std = document.getElementById("std").value;
    var job = document.getElementById("job").value;
    var rela = document.getElementById("rela").value;

   
    var form = new FormData();
    form.append("n",nic);
    form.append("na",name);
    form.append("st",std);
    form.append("j",job);
    form.append("r",rela);

    var parents = new XMLHttpRequest();

    parents.onreadystatechange = function(){
        if(parents.readyState == 4 && parents.status == 200){
            var t = parents.responseText;
            
        }
    }
parents.open("POST","createProcessParents.php")
}

function createSports(){
    var spid  = document.getElementById("ids").value;
    var sports = document.getElementById("sports").value
    var coachid = document.getElementById("coachid").value;
    var date = document.getElementById("date").value;
    var time = document.getElementById("timeInput  ").value;
    var stdindex = document.getElementById("stdindex").value

    var frm = new Fo

   
}

function createExam() {
    var exam_id = document.getElementById("exam_id").value;
    var school = document.getElementById("school").value;
    var class_id = document.getElementById("class_id").value;
    var teacher = document.getElementById("teacher").value;
    var government = document.getElementById("government").value;

    var formData = new FormData();
    formData.append("exam_id", exam_id);
    formData.append("school", school);
    formData.append("class_id", class_id);
    formData.append("teacher", teacher);
    formData.append("government", government);

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                // Request was successful
                var response = xhr.responseText;
                // Handle response as needed
                if(response == "Success"){
                    alert("Success");
                }else{
                    alert(response);
                }
        }
    }
}

    xhr.open("POST", "createExamProcess.php", true);
    xhr.send(formData);
}


function updateStudent(){

    var ind = document.getElementById("ind").value;
    var fullname = document.getElementById("fullname").value;
    var initial = document.getElementById("initial").value;
    var specialneed = document.getElementById("specialneed").value; 
    var paddress = document.getElementById("paddress").value;
    var taddress = document.getElementById("taddress").value;
    var emno = document.getElementById("emno").value;
    var wtno = document.getElementById("wtno").value;
    var hmno = document.getElementById("hmno").value;
    var mbno = document.getElementById("mbno").value;

    var f = new FormData();

    f.append("i", ind);
    f.append("f", fullname);
    f.append("it", initial);
    f.append("sn", specialneed);
    f.append("paddress", paddress);
    f.append("taddress", taddress);
    f.append("emno", emno);
    f.append("wtno", wtno);
    f.append("hmno", hmno);
    f.append("mbno", mbno);

    var cst = new XMLHttpRequest();
    cst.onreadystatechange = function () {
        if (cst.readyState == 4 && cst.status == 200) {
            var t = cst.responseText;
            if(t == "SUCCESS"){
                alert("Success");
                location.reload();
            }else{
                alert(t);
            }
        }
    }
    cst.open("POST", "upateStudentProcess.php", true);
    cst.send(f);



}


function deleteStudent  (){

    var search = document.getElementById("search").value;
    var ind = document.getElementById("ind").value;
    var fullname = document.getElementById("fullname").value;
    var initial = document.getElementById("initial").value;
    var specialneed = document.getElementById("specialneed").value; 
    var paddress = document.getElementById("paddress").value;
    var taddress = document.getElementById("taddress").value;
    var emno = document.getElementById("emno").value;
    var wtno = document.getElementById("wtno").value;
    var hmno = document.getElementById("hmno").value;
    var mbno = document.getElementById("mbno").value;

    var f = new FormData();
    f.append("s", search);
    f.append("i", ind);
    f.append("f", fullname);
    f.append("it", initial);
    f.append("sn", specialneed);
    f.append("paddress", paddress);
    f.append("taddress", taddress);
    f.append("emno", emno);
    f.append("wtno", wtno);
    f.append("hmno", hmno);
    f.append("mbno", mbno);

    var cst = new XMLHttpRequest();
    cst.onreadystatechange = function () {
        if (cst.readyState == 4 && cst.status == 200) {
            var t = cst.responseText;
            if(t == "SUCCESS"){
                alert("Success");
               location.reload();
            }else{
                alert(t);
            }
        }
    }
    cst.open("POST", "deleteStudentProcess.php", true);
    cst.send(f);

}

function updateClass(){
    var search = document.getElementById("search").value;
    var idc = document.getElementById("ind").value;
    var classname = document.getElementById("clname").value;

    var form = new FormData();
    form.append("i",idc);
    form.append("c",classname);

    var cst = new XMLHttpRequest();
    cst.onreadystatechange = function () {
        if (cst.readyState == 4 && cst.status == 200) {
            var t = cst.responseText;
            if(t == "SUCCESS"){
                alert("Success");
                location.reload();
            }else{
                alert(t);
            }
        }
    }
    cst.open("POST", "updateClassProcess.php", true);
    cst.send(form);



}

function deleteClass(){
    form.append("s", search);
    var idc = document.getElementById("ind").value;
    var classname = document.getElementById("clname").value;

    var form = new FormData();
    form.append("s", search);
    form.append("i",idc);
    form.append("c",classname);

    var cst = new XMLHttpRequest();
    cst.onreadystatechange = function () {
        if (cst.readyState == 4 && cst.status == 200) {
            var t = cst.responseText;
            if(t == "SUCCESS"){
                alert("Success");
                location.reload();
            }else{
                alert(t);
            }
        }
    }
    cst.open("POST", "deleteProcessClass.php", true);
    cst.send(form);



}


function updateCocircular(){
    var search = document.getElementById("search").value;
    var clubid = document.getElementById("clubid").value;
    var coachid = document.getElementById("coachid").value;
    var stdindex = document.getElementById("stdindex").value;

    var pos = document.getElementById("pos").value;



    var form = new FormData();
    form.append("s", search);
    form.append("cl",clubid);
    form.append("co",coachid);
    form.append("sin",stdindex);
    form.append("pos",pos);

    var coc = new XMLHttpRequest()

    coc.onreadystatechange = function(){
        if(coc.readyState == 4 && coc.status == 200){
            var t = coc.responseText;
            alert(t);
        }
    }

    coc.open("POST","updateCorcircularProcess.php",true);
    coc.send(form);

}

function deleteCocircular(){
    var search = document.getElementById("search").value;
    var clubid = document.getElementById("clubid").value;
    var coachid = document.getElementById("coachid").value;
    var stdindex = document.getElementById("stdindex").value;

    var pos = document.getElementById("pos").value;

    var form = new FormData();
    form.append("s", search);
    form.append("i",idc);
    form.append("c",classname);

    var cst = new XMLHttpRequest();
    cst.onreadystatechange = function () {
        if (cst.readyState == 4 && cst.status == 200) {
            var t = cst.responseText;
            if(t == "SUCCESS"){
                alert("Success");
                location.reload();
            }else{
                alert(t);
            }
        }
    }
    cst.open("POST", "deleteCocircularProcess.php", true);
    cst.send(form);



}


function updateStaff(){

    var ids = document.getElementById("ind").value;
    var name = document.getElementById("name").value;
    var salary = document.getElementById("salary").value;
    var cat = document.getElementById("clr").value;
    var birthday = document.getElementById("birthday").value;
    var paddress = document.getElementById("paddress").value;
    var taddress = document.getElementById("taddress").value;
    var emno = document.getElementById("emno").value;
    var wtno = document.getElementById("wtno").value;
    var hmno = document.getElementById("hmno").value;
    var mbno = document.getElementById("mbno").value;
    var email = document.getElementById("em").value;

    // alert(name);
    // alert(salary);
    // alert(birthday);
    // alert(cat);
    // alert(paddress);
    // alert(taddress);
    // alert(emno);
    // alert(wtno);
    // alert(hmno);
    // alert(mbno);    

    var form = new FormData();
    form.append("in",ids)
    form.append("n",name);
    form.append("s",salary);
    form.append("c",cat);
    form.append("b",birthday);
    form.append("p",paddress);
    form.append("t",taddress);
    form.append("e",emno);
    form.append("w",wtno);
    form.append("h",hmno);
    form.append("m",mbno);
    form.append("el",email);

    var st = new XMLHttpRequest();
    st.onreadystatechange = function(){
        if(st.readyState == 4 && st.status == 200){
            var t = st.responseText;
            if(t == "Success"){
                alert("Success")
            }else{
                alert(t);
            }
        }
    }
    st.open("POST","updateStaffProcess.php",true);
    st.send(form);
}

function updateExam(){

    var school = document.getElementById("school").value;
    var class_id = document.getElementById("class_id").value;
    var teacher = document.getElementById("teacher").value;
    var government = document.getElementById("government").value;

    var formData = new FormData();
    formData.append("school", school);
    formData.append("class_id", class_id);
    formData.append("teacher", teacher);
    formData.append("government", government);

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                // Request was successful
                var response = xhr.responseText;
                // Handle response as needed
                if(response == "Success"){
                    alert("Success");
                }else{
                    alert(response);
                }
        }
    }
}

    xhr.open("POST", "updateExamProcess.php", true);
    xhr.send(formData);

}


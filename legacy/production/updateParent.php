<?php 
session_start();
require "connection.php";
require "cont.php";


if (isset($_SESSION["u"])) {

    $username = $_SESSION["u"]["username"];

?>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <!-- Meta, title, CSS, favicons, etc. -->
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Update Guardian</title>

        <!-- Bootstrap -->
        <link href="../vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        <!-- Font Awesome -->
        <link href="../vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet">
        <!-- NProgress -->
        <link href="../vendors/nprogress/nprogress.css" rel="stylesheet">
        <!-- iCheck -->
        <link href="../vendors/iCheck/skins/flat/green.css" rel="stylesheet">
        <!-- bootstrap-wysiwyg -->
        <link href="../vendors/google-code-prettify/bin/prettify.min.css" rel="stylesheet">
        <!-- Select2 -->
        <link href="../vendors/select2/dist/css/select2.min.css" rel="stylesheet">
        <!-- Switchery -->
        <link href="../vendors/switchery/dist/switchery.min.css" rel="stylesheet">
        <!-- starrr -->
        <link href="../vendors/starrr/dist/starrr.css" rel="stylesheet">
        <!-- bootstrap-daterangepicker -->
        <link href="../vendors/bootstrap-daterangepicker/daterangepicker.css" rel="stylesheet">

        <link rel="stylesheet" href="style.css">
        <!-- Custom Theme Style -->
        <link href="../build/css/custom.min.css" rel="stylesheet">

        <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js"></script>
    </head>

    <body class="nav-sm">
        <div class="container body">
            <div class="main_container">
                <div class="col-md-3 left_col">
                    <div class="left_col scroll-view">
                        <div class="navbar nav_title" style="border: 0;">
                            <a href="index.php" class="site_title"><i class="fa fa-university"></i> <span>Andiambalama</span></a>
                        </div>

                        <div class="clearfix"></div>

                        <!-- menu profile quick info -->
                        <div class="profile clearfix">
                            <div class="profile_pic">
                                <img src="images/img.jpg" alt="..." class="img-circle profile_img">
                            </div>
                            <div class="profile_info">
                                <span>Welcome,</span>
                                <h2><?php echo $username ?></h2>
                            </div>
                        </div>
                        <!-- /menu profile quick info -->

                        <br />

                        <!-- sidebar menu -->
						<div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
							<div class="menu_section">
								<h3>General</h3>
								<ul class="nav side-menu">
									<li><a><i class="fa fa-home"></i> Home <span class="fa fa-chevron-down"></span></a>
										<ul class="nav child_menu">
											<li><a href="index.php">Dashboard</a></li>
										</ul>
									</li>
									<li><a><i class="fa fa-child"></i> Student <span class="fa fa-chevron-down"></span></a>
										<ul class="nav child_menu">
											<li><a href="student.php">Registration</a></li>
											<li><a href="searchstudent.php">Search</a></li>
											<li><a href="updatestudent.php">Update</a></li>
											<li><a href="deleteStudent.php">Delete</a></li>
										</ul>
									</li>
									<li><a><i class="fa fa-user"></i> Staff <span class="fa fa-chevron-down"></span></a>
										<ul class="nav child_menu">
											<li><a href="staff.php">Registration</a></li>
											<li><a href="searchStaff.php">Search</a></li>
											<li><a href="updateStaff.php">Update</a></li>
											<li><a href="ddeleteStaff.php">Delete</a></li>
										</ul>
									</li>
									<li><a><i class="fa fa-anchor"></i>Guardian <span class="fa fa-chevron-down"></span></a>
									<ul class="nav child_menu">
											<li><a href="parents.php">Registration</a></li>
											<li><a href="searchParent.php">Search</a></li>
											<li><a href="updateParent.php">Update</a></li>
											<li><a href="deleteParent.php">Delete</a></li>
										</ul>
									</li>
									<li><a><i class="fa fa-shield"></i> Class <span class="fa fa-chevron-down"></span></a>
									<ul class="nav child_menu">
											<li><a href="class.php">Registration</a></li>
											<li><a href="searchClass.php">Search</a></li>
											<li><a href="updateClass.php">Update</a></li>
											<li><a href="deleteClass.php">Delete</a></li>
										</ul>
									</li>
									<li><a><i class="fa fa-pencil"></i> Exam <span class="fa fa-chevron-down"></span></a>
									<ul class="nav child_menu">
											<li><a href="exam.php">Registration</a></li>
											<li><a href="searchExam.php">Search</a></li>
											<li><a href="updateExam.php">Update</a></li>
											<li><a href="deleteExam.php">Delete</a></li>
										</ul>
									</li>
									<li><a><i class="fa fa-cubes"></i> Co-curricular <span class="fa fa-chevron-down"></span></a>
									<ul class="nav child_menu">
											<li><a href="cocircular.php">Registration</a></li>
											<li><a href="searchCocircular.php">Search</a></li>
											<li><a href="updateCocircular.php">Update</a></li>
											<li><a href="deleteCocircular.php">Delete</a></li>
										</ul>
									</li>
									<li><a><i class="fa fa-life-ring"></i> Sport <span class="fa fa-chevron-down"></span></a>
									<ul class="nav child_menu">
											<li><a href="sports.php">Registration</a></li>
											<li><a href="searchSport.php">Search</a></li>
											<li><a href="updateSport.php">Update</a></li>
											<li><a href="deleteSport.php">Delete</a></li>
										</ul>
									</li>
									<li><a><i class="fa fa-paw"></i> User <span class="fa fa-chevron-down"></span></a>
									<ul class="nav child_menu">
											<li><a href="user.php">Registration</a></li>
											<li><a href="searchUser.php">Search</a></li>
											<li><a href="updateUser.php">Update</a></li>
											<li><a href="deletesuser.php">Delete</a></li>
										</ul>
									</li>
									<li><a><i class="fa fa-trophy"></i>Scholarship <span class="fa fa-chevron-down"></span></a>
									<ul class="nav child_menu">
											<li><a href="scholes.php">Registration</a></li>
											<li><a href="searchScholes.php">Search</a></li>
											<li><a href="updateScholes.php">Update</a></li>
											<li><a href="deleteScholes.php">Delete</a></li>
										</ul>
									</li>
								</ul>
							</div>
							<div class="menu_section">
								<h3>Enrollment</h3>
								<ul class="nav side-menu">
									<li><a><i class="fa fa-users"></i> Administration <span class="fa fa-chevron-down"></span></a>
										<ul class="nav child_menu">
											<li><a href="addclass.php">Student to Class</a></li>
											<li><a href="addcoact.php">Student to Co-curricular</a></li>
											<li><a href="addexam.php">Student to Exam</a></li>
											<li><a href="addsport.php">tudent to Sport</a></li>
											<li><a href="addparent.php">Student to Guardian</a></li>
											<li><a href="addspneed.php">Student to Special Need</a></li>
											<li><a href="addwelfare.php">Student to Welfare</a></li>
											<li><a href="addteaexam.php">Staff to Exam</a></li>
											<li><a href="addteastudent.php">Staff to Student</a></li>
										</ul>
									</li>

								</ul>
							</div>
							<div class="menu_section">
								<h3>Additional Search</h3>
								<ul class="nav side-menu">
									<li><a><i class="fa fa-filter"></i> Filter <span class="fa fa-chevron-down"></span></a>
										<ul class="nav child_menu">
											<li><a href="stresult.php">Result</a></li>
											<li><a href="stclass.php">Class</a></li>
											<li><a href="stgrade.php">Grade</a></li>
											<li><a href="stsport.php">Sport</a></li>
											<li><a href="stcocoricular.php">CO-Cocircular</a></li>
										</ul>
									</li>

								</ul>
							</div>

						</div>
						<!-- /sidebar menu -->

                        <!-- /menu footer buttons -->
                        <div class="sidebar-footer hidden-small">
                            <a data-toggle="tooltip" data-placement="top" title="Settings">
                                <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
                            </a>
                            <a data-toggle="tooltip" data-placement="top" title="FullScreen">
                                <span class="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
                            </a>
                            <a data-toggle="tooltip" data-placement="top" title="Lock">
                                <span class="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
                            </a>
                            <a data-toggle="tooltip" data-placement="top" title="Logout" href="login.php">
                                <span class="glyphicon glyphicon-off" aria-hidden="true"></span>
                            </a>
                        </div>
                        <!-- /menu footer buttons -->
                    </div>
                </div>

                <!-- top navigation -->
                <div class="top_nav">
                    <div class="nav_menu">
                        <div class="nav toggle">
                            <a id="menu_toggle"><i class="fa fa-bars"></i></a>
                        </div>
                        <nav class="nav navbar-nav">
                            <ul class=" navbar-right">
                                <li class="nav-item dropdown open" style="padding-left: 15px;">
                                    <a href="javascript:;" class="user-profile dropdown-toggle" aria-haspopup="true" id="navbarDropdown" data-toggle="dropdown" aria-expanded="false">
                                        <img src="images/img.jpg" alt=""><?php echo $username ?>
                                    </a>
                                    <div class="dropdown-menu dropdown-usermenu pull-right" aria-labelledby="navbarDropdown">
                                        <a class="dropdown-item" href="javascript:;"> Profile</a>
                                        <a class="dropdown-item" href="javascript:;">
                                            <span class="badge bg-red pull-right">50%</span>
                                            <span>Settings</span>
                                        </a>
                                        <a class="dropdown-item" href="javascript:;">Help</a>
                                        <a class="dropdown-item" href="login.php"><i class="fa fa-sign-out pull-right"></i> Log Out</a>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <!-- /top navigation -->

                <!-- page content -->
                <div class="right_col" role="main">
                    <div class="">
                        <div class="page-title">
                            <div class="title_left">
                                <h3>Update Guardian</h3>
                            </div>

                            <!-- <form method="post"> -->
                            <form action="" method="post">

                                <div class="title_right">
                                    <div class="col-md-5 col-sm-5  form-group pull-right top_search">
                                        <div class="input-group">
                                            <input type="text" class="form-control" required id="search" name="search" value="<?php if (isset($_POST['submit'])) {
                                                                                                                                    echo $_POST['search'];
                                                                                                                                } ?>" placeholder="Search ID...">
                                            <span class="input-group-btn">
                                                <input class="btn btn-dark" type="submit" name="submit" />
                                            </span>
                                        </div>
                                    </div>
                                </div>












                            </form>
                            <!-- </form> -->
                        </div>
                        <div class="clearfix"></div>

                        <div class="x_content">
                            <br />

                            <?php

                            if (isset($_POST['submit'])) {
                                $src = $_POST['search'];

                                $c = mysqli_connect("localhost", "root", "", "dbms_sms");


                                $my = "SELECT * FROM `class` WHERE CONCAT(`id`,`class_name`) like '%$src%';";
                                $query = mysqli_query($c, $my);
                                $rows = mysqli_num_rows($query);
                                if ($rows > 0) {

                                    foreach ($query as $item) {





                            ?>


<div class="item form-group">
											<label class="col-form-label col-md-3 col-sm-3 label-align" for="index">Class ID <span class="required">*</span>
											</label>
											<div class="col-md-6 col-sm-6 ">
												<input type="text" id="ind" class="form-control " disabled value="<?php echo $item['id']; ?>">
											</div>
										</div>

										<div class="item form-group">
											<label class="col-form-label col-md-3 col-sm-3 label-align" for="class-name">Class Name <span class="required">*</span>
											</label>
											<div class="col-md-6 col-sm-6 ">
												<input type="text" id="clname" name="class-name" class="form-control" value="<?php echo $item['class_name']; ?>">
											</div>
										</div>

                                    <?php

                                    }
                                } else {
                                    ?>

                                    <span>No DatA fOUND</span>

                            <?php
                                }
                            }

                            ?>

                            <div class="ln_solid"></div>
                            <div class="item form-group">
                                <div class="col-md-6 col-sm-6 offset-md-3">
                                    
                                    <button class="btn btn-success" type="submit" onclick="updateClass();">Update</button>
                                </div>
                            </div>
                        </div>




                    </div>

                    <!-- jQuery -->
                    <script src="../vendors/jquery/dist/jquery.min.js"></script>
                    <!-- Bootstrap -->
                    <script src="../vendors/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
                    <!-- FastClick -->
                    <script src="../vendors/fastclick/lib/fastclick.js"></script>
                    <!-- NProgress -->
                    <script src="../vendors/nprogress/nprogress.js"></script>
                    <!-- bootstrap-progressbar -->
                    <script src="../vendors/bootstrap-progressbar/bootstrap-progressbar.min.js"></script>
                    <!-- iCheck -->
                    <script src="../vendors/iCheck/icheck.min.js"></script>
                    <!-- bootstrap-daterangepicker -->
                    <script src="../vendors/moment/min/moment.min.js"></script>
                    <script src="../vendors/bootstrap-daterangepicker/daterangepicker.js"></script>
                    <!-- bootstrap-wysiwyg -->
                    <script src="../vendors/bootstrap-wysiwyg/js/bootstrap-wysiwyg.min.js"></script>
                    <script src="../vendors/jquery.hotkeys/jquery.hotkeys.js"></script>
                    <script src="../vendors/google-code-prettify/src/prettify.js"></script>
                    <!-- jQuery Tags Input -->
                    <script src="../vendors/jquery.tagsinput/src/jquery.tagsinput.js"></script>
                    <!-- Switchery -->
                    <script src="../vendors/switchery/dist/switchery.min.js"></script>
                    <!-- Select2 -->
                    <script src="../vendors/select2/dist/js/select2.full.min.js"></script>
                    <!-- Parsley -->
                    <script src="../vendors/parsleyjs/dist/parsley.min.js"></script>
                    <!-- Autosize -->
                    <script src="../vendors/autosize/dist/autosize.min.js"></script>
                    <!-- jQuery autocomplete -->
                    <script src="../vendors/devbridge-autocomplete/dist/jquery.autocomplete.min.js"></script>
                    <!-- starrr -->
                    <script src="../vendors/starrr/dist/starrr.js"></script>
                    <!-- Custom Theme Scripts -->
                    <script src="../build/js/custom.min.js"></script>

                    <script src="script.js"></script>

    </body>

    </html>
<?php
} else {
    header("location:login.php");
} ?>
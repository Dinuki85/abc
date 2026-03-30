<?php
session_start();
require "connection.php";

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

		<title>Gentelella Alela! | </title>

		<!-- Bootstrap -->
		<link href="../vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
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

		<!-- Custom Theme Style -->
		<link href="../build/css/custom.min.css" rel="stylesheet">
	</head>

	<body class="nav-md">
		<div class="container body">
			<div class="main_container">
				<div class="col-md-3 left_col">
					<div class="left_col scroll-view">
						<div class="navbar nav_title" style="border: 0;">
							<a href="index.php" class="site_title"><i class="fa fa-paw"></i> <span>Andiambalama</span></a>
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
										<li><a><i class="fa fa-edit"></i> Registration <span class="fa fa-chevron-down"></span></a>
											<ul class="nav child_menu">
												<li><a href="student.php">Student</a></li>
												<li><a href="staff.php">Staff</a></li>
												<li><a href="class.php">Class</a></li>
												<li><a href="cocircular.php">CO-Cocircular</a></li>
												<li><a href="parents.php">Guardian</a></li>
												<li><a href="sports.php">Sports</a></li>
												<li><a href="exam.php">Exam</a></li>
												<li><a href="welfare.php">Welfare</a></li>
												<li><a href="scholes.php">Scholarships</a></li>
												<li><a href="trip.php">Trip & Field Visit</a></li>
												<li><a href="other.php">Other Event</a></li>
											</ul>
										</li>
										<li><a><i class="fa fa-desktop"></i> Enrolment <span class="fa fa-chevron-down"></span></a>
											<ul class="nav child_menu">
												<li><a href="addclass.php">Add To Class</a></li>
												<li><a href="addsport.php">Add To  Sport</a></li>
												<li><a href="addcoact.php">Add to CoC Activities</a></li>
												<li><a href="addschole.php">Add to Schoollerships</a></li>
												<li><a href="addspecialneed.php">Add to Special Need</a></li>
											</ul>
										</li>
										<li><a><i class="fa fa-table"></i>Time Tables <span class="fa fa-chevron-down"></span></a>
											<ul class="nav child_menu">
												<li><a href="ttableclass.php">Class Timetables</a></li>
												<li><a href="ttableteacher.php">Teacher Timetables</a></li>
												<li><a href="ttableexame.php">Exam Timetables</a></li>
												<li><a href="ttableaftersch.php">After School Timetables</a></li>
											</ul>
										</li>
										<li><a><i class="fa fa-bar-chart-o"></i> Behavior <span class="fa fa-chevron-down"></span></a>
											<ul class="nav child_menu">
												<li><a href="bresult.php">Exam Result</a></li>
												<li><a href="bachieve.php">Achievements</a></li>
												<li><a href="bdisciplin.php">Disciplinary</a></li>
											
											</ul>
										</li>
										<li><a><i class="fa fa-clone"></i>Summery <span class="fa fa-chevron-down"></span></a>
											<ul class="nav child_menu">
												<li><a href="profstudent.php">Student Profile</a></li>
												<li><a href="profstaff.php">Staff Profile</a></li>
												<li><a href="profsport.php">Sport Profile</a></li>
												<li><a href="profsubject.php">Subject Profile</a></li>
												<li><a href="profclztimetable.php">Class Timetable</a></li>
												<li><a href="profteatimetable.php">Teacher Timetable</a></li>
											</ul>
										</li>
									</ul>
								</div>
								<div class="menu_section">
									<h3>Additional Search</h3>
									<ul class="nav side-menu">
										<li><a><i class="fa fa-bug"></i> Filter <span class="fa fa-chevron-down"></span></a>
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
								<h3>Other Event Registration</h3>
							</div>

							<div class="title_right">
								<div class="col-md-5 col-sm-5  form-group pull-right top_search">
									<div class="input-group">
										<input type="text" class="form-control" placeholder="Search for...">
										<span class="input-group-btn">
											<button class="btn btn-default" type="button">Go!</button>
										</span>
									</div>
								</div>
							</div>
						</div>
						<div class="clearfix"></div>
						<div class="row">
							<div class="col-md-12 col-sm-12 ">
								<div class="x_panel">
									<div class="x_title">
										<h2>Other Event<small>Basic Information</small></h2>
										<ul class="nav navbar-right panel_toolbox">
											<li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
											</li>
											<li class="dropdown">
												<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-wrench"></i></a>
												<ul class="dropdown-menu" role="menu">
													<li><a class="dropdown-item" href="#">Settings 1</a>
													</li>
													<li><a class="dropdown-item" href="#">Settings 2</a>
													</li>
												</ul>
											</li>
											<li><a class="close-link"><i class="fa fa-close"></i></a>
											</li>
										</ul>
										<div class="clearfix"></div>
									</div>
									<div class="x_content">
										<br />


										<div class="item form-group">
											<label class="col-form-label col-md-3 col-sm-3 label-align" for="ids">Event ID <span class="required">*</span>
											</label>
											<div class="col-md-6 col-sm-6 ">
												<input type="text" id="ids" class="form-control ">
											</div>
										</div>
										<div class="item form-group">
											<label class="col-form-label col-md-3 col-sm-3 label-align" for="sports">Event Name <span class="required">*</span>
											</label>
											<div class="col-md-6 col-sm-6 ">
												<input type="text" id="sports" class="form-control ">
											</div>
										</div>
										<div class="item form-group">
											<label for="padress" class="col-form-label col-md-3 col-sm-3 label-align">Event Type</label>
											<div class="col-md-6 col-sm-6 ">
												<input id="etype" class="form-control" type="text" name="etype">
											</div>
										</div>
										<div class="item form-group">
											<label for="padress" class="col-form-label col-md-3 col-sm-3 label-align">Teacher Incharge ID</label>
											<div class="col-md-6 col-sm-6 ">
												<input id="tincha" class="form-control" type="text" name="tincha">
											</div>
										</div>
										<div class="item form-group">
											<label for="tadress" class="col-form-label col-md-3 col-sm-3 label-align">Date</label>
											<div class="col-md-6 col-sm-6 ">
												<input id="date" class="form-control" type="date" name="date">
												<script>
													function timeFunctionLong(input) {
														setTimeout(function() {
															input.type = 'text';
														}, 60000);
													}
												</script>
											</div>
										</div>

										<div class="item form-group">
											<label for="emno" class="col-form-label col-md-3 col-sm-3 label-align">Start Time</label>
											<div class="col-md-6 col-sm-6 ">
												<input type="time" id="timeInput" class="form-control">
												<script>
													function timeFunctionLong(input) {
														setTimeout(function() {
															input.type = 'text';
														}, 60000);
													}
												</script>
											</div>
										</div>
										<div class="item form-group">
											<label for="wtno" class="col-form-label col-md-3 col-sm-3 label-align">Special Note</label>
											<div class="col-md-6 col-sm-6 ">
												<input id="spnote" class="form-control" type="text" name="spnote">
											</div>
										</div>
										
										
										<div class="ln_solid"></div>
										<div class="item form-group">
											<div class="col-md-6 col-sm-6 offset-md-3">
												<button class="btn btn-primary" type="button">Cancel</button>
												<button class="btn btn-primary" type="reset">Reset</button>
												<button class="btn btn-success" onclick="createSports();">Submit</button>
											</div>
										</div>


									</div>
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
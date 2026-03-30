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
    <!-- FullCalendar -->
    <link href="../vendors/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet">
    <link href="../vendors/fullcalendar/dist/fullcalendar.print.css" rel="stylesheet" media="print">

    <!-- Custom styling plus plugins -->
    <link href="../build/css/custom.min.css" rel="stylesheet">
  </head>

  <body class="nav-md">
    <div class="container body">
      <div class="main_container">
        <div class="col-md-3 left_col">
          <div class="left_col scroll-view">
            <div class="navbar nav_title" style="border: 0;">
              <a href="index.html" class="site_title"><i class="fa fa-paw"></i> <span>Andiambalama</span></a>
            </div>

            <div class="clearfix"></div>

            <!-- menu profile quick info -->
            <div class="profile clearfix">
              <div class="profile_pic">
                <img src="images/img.jpg" alt="..." class="img-circle profile_img">
              </div>
              <div class="profile_info">
                <span>Welcome,</span>
                <h2>John Doe</h2>
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
              <a data-toggle="tooltip" data-placement="top" title="Logout" href="login.html">
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
                <h3>Calendar <small>Click to add/edit events</small></h3>
              </div>

              <div class="title_right">
                <div class="col-md-5 col-sm-5   form-group pull-right top_search">
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
              <div class="col-md-12">
                <div class="x_panel">
                  <div class="x_title">
                    <h2>Calendar Events <small>Sessions</small></h2>
                    <ul class="nav navbar-right panel_toolbox">
                      <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                      </li>
                      <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-wrench"></i></a>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item" href="#">Settings 1</a>
                            <a class="dropdown-item" href="#">Settings 2</a>
                          </div>
                      </li>
                      <li><a class="close-link"><i class="fa fa-close"></i></a>
                      </li>
                    </ul>
                    <div class="clearfix"></div>
                  </div>
                  <div class="x_content">

                    <div id='calendar'></div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /page content -->

        <!-- footer content -->
        <footer>
          <div class="pull-right">
            Gentelella - Bootstrap Admin Template by <a href="https://colorlib.com">Colorlib</a>
          </div>
          <div class="clearfix"></div>
        </footer>
        <!-- /footer content -->
      </div>
    </div>

    <!-- calendar modal -->
    <div id="CalenderModalNew" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">

          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title" id="myModalLabel">New Calendar Entry</h4>
          </div>
          <div class="modal-body">
            <div id="testmodal" style="padding: 5px 20px;">
              <form id="antoform" class="form-horizontal calender" role="form">
                <div class="form-group">
                  <label class="col-sm-3 control-label">Title</label>
                  <div class="col-sm-9">
                    <input type="text" class="form-control" id="title" name="title">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-3 control-label">Description</label>
                  <div class="col-sm-9">
                    <textarea class="form-control" style="height:55px;" id="descr" name="descr"></textarea>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default antoclose" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary antosubmit">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <div id="CalenderModalEdit" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">

          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title" id="myModalLabel2">Edit Calendar Entry</h4>
          </div>
          <div class="modal-body">

            <div id="testmodal2" style="padding: 5px 20px;">
              <form id="antoform2" class="form-horizontal calender" role="form">
                <div class="form-group">
                  <label class="col-sm-3 control-label">Title</label>
                  <div class="col-sm-9">
                    <input type="text" class="form-control" id="title2" name="title2">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-3 control-label">Description</label>
                  <div class="col-sm-9">
                    <textarea class="form-control" style="height:55px;" id="descr2" name="descr"></textarea>
                  </div>
                </div>

              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default antoclose2" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary antosubmit2">Save changes</button>
          </div>
        </div>
      </div>
    </div>

    <div id="fc_create" data-toggle="modal" data-target="#CalenderModalNew"></div>
    <div id="fc_edit" data-toggle="modal" data-target="#CalenderModalEdit"></div>
    <!-- /calendar modal -->
        
    <!-- jQuery -->
    <script src="../vendors/jquery/dist/jquery.min.js"></script>
    <!-- Bootstrap -->
   <script src="../vendors/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <!-- FastClick -->
    <script src="../vendors/fastclick/lib/fastclick.js"></script>
    <!-- NProgress -->
    <script src="../vendors/nprogress/nprogress.js"></script>
    <!-- FullCalendar -->
    <script src="../vendors/moment/min/moment.min.js"></script>
    <script src="../vendors/fullcalendar/dist/fullcalendar.min.js"></script>

    <!-- Custom Theme Scripts -->
    <script src="../build/js/custom.min.js"></script>

  </body>
</html>
<?php
} else {
	header("location:login.php");
} ?>
<?php

session_start();

require "connection.php";

if (isset($_SESSION["u"])) {

  $User = $_SESSION["u"]["username"];

?>

  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="images/favicon.png" type="image/ico" />

    <title>Welcome to Andiambalama MV</title>

    <!-- Bootstrap -->
    <link href="../vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="../vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <!-- NProgress -->
    <link href="../vendors/nprogress/nprogress.css" rel="stylesheet">
    <!-- iCheck -->
    <link href="../vendors/iCheck/skins/flat/green.css" rel="stylesheet">

    <!-- bootstrap-progressbar -->
    <link href="../vendors/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css" rel="stylesheet">
    <!-- JQVMap -->
    <link href="../vendors/jqvmap/dist/jqvmap.min.css" rel="stylesheet" />
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
              <a href="index.html" class="site_title"><i class="fa fa-university"></i> <span>Andiambalama</span></a>
            </div>

            <div class="clearfix"></div>

            <!-- menu profile quick info -->
            <div class="profile clearfix">
              <div class="profile_pic">
                <img src="images/img.jpg" alt="..." class="img-circle profile_img">
              </div>
              <div class="profile_info">
                <span>Welcome,</span>
                <h2><?php echo $User ?></h2>
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
                    <img src="images/img.jpg" alt="">Admin
                  </a>
                  <div class="dropdown-menu dropdown-usermenu pull-right" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="javascript:;"> Profile</a>
                    <a class="dropdown-item" href="javascript:;">
                      <span class="badge bg-red pull-right">50%</span>
                      <span>Settings</span>
                    </a>
                    <a class="dropdown-item" href="javascript:;">Help</a>
                    <a class="dropdown-item" href="login.html"><i class="fa fa-sign-out pull-right"></i> Log Out</a>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <!-- /top navigation -->

        <!-- page content -->
        <div class="right_col" role="main">
            <div class="page-title">
						</div>
          <!-- top tiles -->

          <?php

          $student = Database::search("SELECT * FROM `user`");
          $student_rows = $student->num_rows;

          ?>
          <div class="row" style="display: inline-block;">
            <div class="tile_count">
              <div class="col-md-3 col-sm-4  tile_stats_count">
                <span class="count_top"><i class="fa fa-child"></i> All Student</span>
                <div class="count"><?php echo $student_rows; ?></div>
                <span class="count_bottom">Up to Day</span>
              </div>

              <?php

              $staff = Database::search("SELECT * FROM `staff`");
              $staff_rows = $staff->num_rows;

              ?>
              <div class="col-md-3 col-sm-4  tile_stats_count">
                <label class="count_top"><i class="fa fa-user"></i> All Staff</label>
                <div class="count"><?php echo $staff_rows; ?></div>
                <span class="count_bottom">Up to Day</span>
              </div>

              <?php

              $parenst = Database::search("SELECT * FROM `parent`");
              $parent_rows = $parenst->num_rows;

              ?>
              <div class="col-md-3 col-sm-4  tile_stats_count">
                <span class="count_top"><i class="fa fa-anchor"></i> All Guardian</span>
                <div class="count "><?php echo $parent_rows; ?></div>
                <span class="count_bottom">Up to Day</span>
              </div>

              

              <?php


              $class = Database::search("SELECT * FROM `class`");
              $class_rows = $class->num_rows;


              ?>

              <div class="col-md-3 col-sm-4  tile_stats_count">
                <span class="count_top"><i class="fa fa-shield"></i> All Class</span>
                <div class="count"><?php echo $class_rows; ?></div>
                <span class="count_bottom">Up to Day</span>
              </div>

              <!-- < <div class="col-md-2 col-sm-4  tile_stats_count">
            <span class="count_top"><i class="fa fa-user"></i> Total Staff</span>
              <div class="count"></div>
              <span class="count_bottom">From last Day</span>
            </div> -->

              
            </div>
          </div>
          <!-- /top tiles -->

         
          <br />

          <div class="row">


         

            


           
          </div>


          
        </div>
        <!-- /page content -->

        <!-- footer content -->
        <footer>
          <div class="pull-right">
           
          </div>
          <div class="clearfix"></div>
        </footer>
        <!-- /footer content -->
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
    <!-- Chart.js -->
    <script src="../vendors/Chart.js/dist/Chart.min.js"></script>
    <!-- gauge.js -->
    <script src="../vendors/gauge.js/dist/gauge.min.js"></script>
    <!-- bootstrap-progressbar -->
    <script src="../vendors/bootstrap-progressbar/bootstrap-progressbar.min.js"></script>
    <!-- iCheck -->
    <script src="../vendors/iCheck/icheck.min.js"></script>
    <!-- Skycons -->
    <script src="../vendors/skycons/skycons.js"></script>
    <!-- Flot -->
    <script src="../vendors/Flot/jquery.flot.js"></script>
    <script src="../vendors/Flot/jquery.flot.pie.js"></script>
    <script src="../vendors/Flot/jquery.flot.time.js"></script>
    <script src="../vendors/Flot/jquery.flot.stack.js"></script>
    <script src="../vendors/Flot/jquery.flot.resize.js"></script>
    <!-- Flot plugins -->
    <script src="../vendors/flot.orderbars/js/jquery.flot.orderBars.js"></script>
    <script src="../vendors/flot-spline/js/jquery.flot.spline.min.js"></script>
    <script src="../vendors/flot.curvedlines/curvedLines.js"></script>
    <!-- DateJS -->
    <script src="../vendors/DateJS/build/date.js"></script>
    <!-- JQVMap -->
    <script src="../vendors/jqvmap/dist/jquery.vmap.js"></script>
    <script src="../vendors/jqvmap/dist/maps/jquery.vmap.world.js"></script>
    <script src="../vendors/jqvmap/examples/js/jquery.vmap.sampledata.js"></script>
    <!-- bootstrap-daterangepicker -->
    <script src="../vendors/moment/min/moment.min.js"></script>
    <script src="../vendors/bootstrap-daterangepicker/daterangepicker.js"></script>

    <!-- Custom Theme Scripts -->
    <script src="../build/js/custom.min.js"></script>

  </body>

  </html>

<?php } else {
  echo "invalid username or password";
  header("location:login.php");
} ?>
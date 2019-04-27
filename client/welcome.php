<!DOCTYPE html>
<html>
<head>
	

	<title>NODEJS ONLINE GAME</title>
	<link rel="shortcut icon" href="images/favicon.ico" />
	
	<link rel="stylesheet" type="text/css" href="css/index.css">
	<link rel="stylesheet" href="css/bootstrap.css"/>
	<link rel="stylesheet" href="css/bootstrap.min.css"/>


		
		
		

</head>
<body>
	
	<div class="cont">
		<div class="row">
			<div class="container-fluid">
				<div class="col-md-12" style="background : rgba(0,0,0,0.5);">
					<p class="name">NODE.JS GAME</p>
				</div>
			</div>
		</div>
	</div>

	<div class="cont">
		<div class="row">
			<div class="container-fluid">
				<div class="col-md-6 col-md-offset-1" style="margin-top : 100px;">
					<h2 class="thank"><?php echo $_GET["name"]; ?>, Thanks</h2>
					<h3 class="welcome">Your E-Mail ID is : <?php echo $_GET["email"]; ?></h3>
					<h3 class="welcome">Your Roll No is : <?php echo $_GET["rollno"]; ?></h3>

				</div>
				<div class="col-md-3 col-md-offset-1">
					<div class="col-md-12" style="margin-top : 100px;">
					<div class="col-md-12">
						<button type="button" class="btn btn-default btn-lg btn-block"><a href="">PLAY NOW</a></button>
					</div>
					<div class="col-md-12" style="margin-top : 50px;">
						<button type="button" class="btn btn-default btn-lg btn-block"><a href="index.html">HOME PAGE</a></button>
					</div>
					</div>
				</div>
			</div>
		</div>
	</div>


	
	
</body>
</html>
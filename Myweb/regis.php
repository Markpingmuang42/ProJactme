<!DOCTYPE html>
<html lang="en">
<hend>
  <meta charset="UTF-8">
  <meta name="viweport" content="width=device-width,initial-scale=1.0">
  <title>register</title>
  <link rel="stylesheet" href="css/bootstrap.min.css">
</hend>

<body>
  <nav class="navbar navbar-light bg-dark">
    <span class="navbar-brand mb-0 h1">
      <h1><font color="#c9c9c9">Webwri</font></h1>
  </nav>
  <div class="container" style="background-color: #c9c9c9;">
    <div class="row justify-content-center align-items-center" style="height:90vh">
      <div class="col-4">
        <div class="card">
          <div class="card-body">
            <form action="regis_db.php" method="post">
              <div class="form-group">
                <h4>Name:</h4>
                <input type="text" class="form-control" name="username" placeholder="Nickname">
                <h4>E-Mail:</h4>
                <input type="text" class="form-control" name="email" placeholder="e-mail">
              </div>
              <div class="form-group">
                <h4>Password:</h4>
                <input type="password" class="form-control" name="password_1" placeholder="password">
                <h4>Confirm Password:</h4>
                <input type="password" class="form-control" name="password_2" placeholder="Confirm Password"
                  placeholder="confirm password">
              </div>
              <div class="row gx-3">
                <div class="col">
                  <a href="login.php"><button type="button" id="sendlogin" class="btn btn-outline-danger">cancel</button></a>
                  <button type="submit" name="reg_user" class="btn btn-outline-primary"
                    style="float:right">register</button></a>
                </div>
              </div>
          </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  </div>
</body>

</html>
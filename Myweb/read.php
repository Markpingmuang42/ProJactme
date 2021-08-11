<?php 
    include('wri_db.php');
    $sql="SELECT*FROM story";
    $query=mysqli_query($conn,$sql);
?>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>อ่าน</title>

  <link rel="stylesheet" href="css/bootstrap.min.css">
  <link rel="stylesheet" href="custom.css">
  <link rel="stylesheet" href="sss.css">
</head>

<body>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-item nav-link active" href="index.php">Home</a>
      </div>
    </div>
  </nav>
  <script src="js/bootstrap.min.js"></script>
<div class="imtop">
  <img src="image/02.jpg" width="100%" height="300">
</div>
  <header>
    <div class="topnav">
      <a href="#">ชื่อเรื่อง</a>
      <div style="padding: 8px 0px; text-align: center;">  
          <button type="button" id="sendlogin" class="btn btn-outline-danger" style="float:right; ">ยอดวิว:100k</button>
          <button type="button" id="sendlogin" class="btn btn-success" style="float:right">บันทึก</button>
          <button type="button" id="sendlogin" class="btn btn-primary" style="float:right">ถูกใจ</button>
        </div>
  </header>
  <body style="background-color:#c9c9c9">
    <div class="container" style="background-color: #a3a3a3; padding: 10% 20%;">
    <?php foreach($query as $data){?>
    <?=$data['Sto_subject']?>
    <?php } ?>
  </div>
</div>
<body>
  <div class="container" style="background-color: #c9c9c9; padding: 1% 5%;">
  <div class="mb-4">
    <label for="textarea" class="form-label">
        <h3>แสดงความเห็น</h3>
    </label>
    <textarea name="textarea" id="textarea" cols="20" rows="5" class="form-control"
        placeholder="เขียน..."></textarea>
</div>
<div class="form-group">
  <div class="ccc" style="text-align: right;">
      <button type="button" class="btn btn-primary ">ยืนยัน</button>
      <button type="button" class="btn btn-danger ">ยกเลิก</button>
</div>
      <div>
       <a href="index.php"><button type="button" class="btn btn-dark">กลับ</button></a> 
      </div>

  </div>
</div>
</div>
</html>
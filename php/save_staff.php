<?php
// 连接数据库
$conn = new mysqli('localhost', 'root', 'password', 'qd_haiwan_chem');

// 检查连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}

// 获取表单数据
$name = $_POST['staff-name'];
$position = $_POST['staff-position'];
$specialty = $_POST['staff-specialty'];
$email = $_POST['staff-email'];
$image_url = $_POST['staff-image'];

// 插入数据
$sql = "INSERT INTO staff (name, position, specialty, email, image_url) VALUES ('$name', '$position', '$specialty', '$email', '$image_url')";

if ($conn->query($sql) === TRUE) {
    echo "人员信息保存成功";
} else {
    echo "错误: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?> 
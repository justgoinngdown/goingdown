<?php
// 连接数据库
$conn = new mysqli('localhost', 'root', 'password', 'qd_haiwan_chem');

// 检查连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}

// 获取表单数据
$name = $_POST['project-name'];
$description = $_POST['project-description'];
$manager = $_POST['project-manager'];

// 插入数据
$sql = "INSERT INTO projects (name, description, manager) VALUES ('$name', '$description', '$manager')";

if ($conn->query($sql) === TRUE) {
    echo "项目信息保存成功";
} else {
    echo "错误: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?> 
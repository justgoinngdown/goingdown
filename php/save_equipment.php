<?php
// 连接数据库
$conn = new mysqli('localhost', 'root', 'password', 'qd_haiwan_chem');

// 检查连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}

// 获取表单数据
$name = $_POST['equipment-name'];
$category = $_POST['equipment-category'];
$quantity = $_POST['equipment-quantity'];
$image_url = $_POST['equipment-image'];

// 插入数据
$sql = "INSERT INTO equipment (name, category, quantity, image_url) VALUES ('$name', '$category', $quantity, '$image_url')";

if ($conn->query($sql) === TRUE) {
    echo "设备信息保存成功";
} else {
    echo "错误: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?> 
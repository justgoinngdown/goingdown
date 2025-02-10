<?php
// 连接数据库
$conn = new mysqli('localhost', 'root', 'password', 'qd_haiwan_chem');

// 检查连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}

// 获取表单数据
$male = $_POST['male'];
$female = $_POST['female'];
$bachelor = $_POST['bachelor'];
$master = $_POST['master'];
$doctor = $_POST['doctor'];
$twenties = $_POST['twenties'];
$thirties = $_POST['thirties'];
$forties = $_POST['forties'];
$fifties = $_POST['fifties'];

// 更新数据
$sql = "UPDATE staff_stats SET 
        male = $male, 
        female = $female, 
        bachelor = $bachelor, 
        master = $master, 
        doctor = $doctor, 
        twenties = $twenties, 
        thirties = $thirties, 
        forties = $forties, 
        fifties = $fifties 
        WHERE id = 1";

if ($conn->query($sql) === TRUE) {
    echo "人员统计信息保存成功";
} else {
    echo "错误: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?> 
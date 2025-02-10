<?php
// 连接数据库
$conn = new mysqli('localhost', 'root', 'password', 'qd_haiwan_chem');

// 检查连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}

// 查询统计数据
$stats = array();

// 获取总设备数量
$sql = "SELECT COUNT(*) AS equipment FROM equipment";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$stats['equipment'] = $row['equipment'];

// 获取总人员数量
$sql = "SELECT COUNT(*) AS staff FROM staff";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$stats['staff'] = $row['staff'];

// 获取总项目数量
$sql = "SELECT COUNT(*) AS projects FROM projects";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$stats['projects'] = $row['projects'];

echo json_encode($stats);

$conn->close();
?> 
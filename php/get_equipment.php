<?php
// 连接数据库
$conn = new mysqli('localhost', 'root', 'password', 'qd_haiwan_chem');

// 检查连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}

// 查询数据
$sql = "SELECT * FROM equipment";
$result = $conn->query($sql);

$equipment = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $equipment[] = $row;
    }
}

echo json_encode($equipment);

$conn->close();
?> 
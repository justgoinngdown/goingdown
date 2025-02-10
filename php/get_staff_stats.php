<?php
// 连接数据库
$conn = new mysqli('localhost', 'root', 'password', 'qd_haiwan_chem');

// 检查连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}

// 查询统计数据
$sql = "SELECT * FROM staff_stats";
$result = $conn->query($sql);

$stats = array();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $stats = array(
        'gender' => array(
            'male' => $row['male'],
            'female' => $row['female']
        ),
        'education' => array(
            'bachelor' => $row['bachelor'],
            'master' => $row['master'],
            'doctor' => $row['doctor']
        ),
        'age' => array(
            'twenties' => $row['twenties'],
            'thirties' => $row['thirties'],
            'forties' => $row['forties'],
            'fifties' => $row['fifties']
        )
    );
}

echo json_encode($stats);

$conn->close();
?> 
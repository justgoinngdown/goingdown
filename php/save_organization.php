<?php
// 连接数据库
$conn = new mysqli('localhost', 'root', 'password', 'qd_haiwan_chem');

// 检查连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}

// 获取表单数据
$group_name = $_POST['group-name'];
$group_equipment = implode(',', $_POST['group-equipment']);
$group_staff = implode(',', $_POST['group-staff']);
$group_projects = implode(',', $_POST['group-projects']);

// 插入数据
$sql = "INSERT INTO organization (group_name, group_equipment, group_staff, group_projects) VALUES ('$group_name', '$group_equipment', '$group_staff', '$group_projects')";

if ($conn->query($sql) === TRUE) {
    echo "组织架构信息保存成功";
} else {
    echo "错误: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?> 
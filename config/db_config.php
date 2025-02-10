<?php
// 数据库配置信息
define('DB_HOST', 'localhost');     // 数据库主机
define('DB_USER', 'root');          // 数据库用户名
define('DB_PASS', '');              // 数据库密码
define('DB_NAME', 'website_db');    // 数据库名

// 创建数据库连接
function getDBConnection() {
    try {
        $conn = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
        // 设置 PDO 错误模式为异常
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn;
    } catch(PDOException $e) {
        die("连接失败: " . $e->getMessage());
    }
}
?> 
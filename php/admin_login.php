<?php
// 启用错误报告
error_reporting(E_ALL);
ini_set('display_errors', 1);

// 启用session
session_start();

// 引入管理员配置文件
require_once '../config/admin_config.php';

// 处理POST请求
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = isset($_POST['username']) ? trim($_POST['username']) : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';
    
    // 记录接收到的数据（实际环境中请删除这些调试信息）
    error_log("Received login attempt - Username: " . $username);
    error_log("Password length: " . strlen($password));
    
    // 验证登录
    if (verifyAdminLogin($username, $password)) {
        // 登录成功
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_username'] = $username;
        
        // 记录成功登录
        error_log("Login successful for user: " . $username);
        
        // 返回成功响应
        header('Content-Type: application/json');
        echo json_encode(['success' => true, 'message' => '登录成功']);
    } else {
        // 记录失败登录
        error_log("Login failed for user: " . $username);
        
        // 登录失败
        http_response_code(401);
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => '用户名或密码错误']);
    }
} else {
    // 非POST请求
    http_response_code(405);
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => '不支持的请求方法']);
}
?> 
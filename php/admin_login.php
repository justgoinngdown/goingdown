<?php
// 启用session
session_start();

// 引入管理员配置文件
require_once '../config/admin_config.php';

// 处理POST请求
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = isset($_POST['username']) ? trim($_POST['username']) : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';
    
    // 验证登录
    if (verifyAdminLogin($username, $password)) {
        // 登录成功
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_username'] = $username;
        
        // 返回成功响应
        echo json_encode(['success' => true, 'message' => '登录成功']);
    } else {
        // 登录失败
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => '用户名或密码错误']);
    }
} else {
    // 非POST请求
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => '不支持的请求方法']);
}
?> 
<?php
// 启用session
session_start();

// 检查是否是API请求
function isApiRequest() {
    return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && 
           strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';
}

// 检查管理员是否已登录
function checkAdminAuth() {
    if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
        if (isApiRequest()) {
            // API请求返回JSON响应
            header('Content-Type: application/json');
            http_response_code(401);
            echo json_encode(['error' => '未授权访问', 'code' => 401]);
        } else {
            // 普通请求重定向到登录页面
            header('Location: ../admin.html');
        }
        exit;
    }
}

// 执行认证检查
checkAdminAuth();
?> 
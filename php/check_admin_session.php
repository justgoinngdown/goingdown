<?php
// 启用错误报告
error_reporting(E_ALL);
ini_set('display_errors', 1);

// 启用session
session_start();

// 检查管理员是否已登录
function isAdminLoggedIn() {
    $isLoggedIn = isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true;
    error_log("Session check - Logged in: " . ($isLoggedIn ? 'true' : 'false'));
    return $isLoggedIn;
}

// 如果是AJAX请求检查登录状态
if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') {
    header('Content-Type: application/json');
    $status = ['logged_in' => isAdminLoggedIn()];
    error_log("AJAX session check - Response: " . json_encode($status));
    echo json_encode($status);
    exit;
}

// 如果不是AJAX请求且未登录，重定向到登录页面
if (!isAdminLoggedIn()) {
    error_log("Non-AJAX request - Not logged in, redirecting to login page");
    header('Location: ../admin.html');
    exit;
}

error_log("Session check passed - User is logged in");
?> 
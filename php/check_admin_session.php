<?php
session_start();

// 检查管理员是否已登录
function isAdminLoggedIn() {
    return isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true;
}

// 如果是AJAX请求检查登录状态
if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') {
    header('Content-Type: application/json');
    echo json_encode(['logged_in' => isAdminLoggedIn()]);
    exit;
}

// 如果不是AJAX请求且未登录，重定向到登录页面
if (!isAdminLoggedIn()) {
    header('Location: ../admin.html');
    exit;
}
?> 
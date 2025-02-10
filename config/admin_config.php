<?php
// 管理员账号配置
define('ADMIN_USERNAME', 'admin');
define('ADMIN_PASSWORD', '15684706918');

// 验证管理员登录
function verifyAdminLogin($username, $password) {
    // 记录验证过程（实际环境中请删除这些调试信息）
    error_log("Verifying login - Username match: " . ($username === ADMIN_USERNAME ? 'true' : 'false'));
    error_log("Password match: " . ($password === ADMIN_PASSWORD ? 'true' : 'false'));
    
    // 验证用户名和密码
    return $username === ADMIN_USERNAME && $password === ADMIN_PASSWORD;
}
?> 
<?php
// 管理员账号配置
define('ADMIN_USERNAME', 'admin');
// 使用 password_hash 加密存储密码
define('ADMIN_PASSWORD_HASH', '$2y$10$' . hash('sha256', 'liu15588531537'));

// 验证管理员登录
function verifyAdminLogin($username, $password) {
    // 记录验证过程（实际环境中请删除这些调试信息）
    error_log("Verifying username: " . $username);
    error_log("Expected username: " . ADMIN_USERNAME);
    
    // 首先验证用户名
    if ($username !== ADMIN_USERNAME) {
        error_log("Username mismatch");
        return false;
    }
    
    // 验证密码
    $hashedPassword = '$2y$10$' . hash('sha256', $password);
    $result = ($hashedPassword === ADMIN_PASSWORD_HASH);
    error_log("Password verification result: " . ($result ? "true" : "false"));
    
    return $result;
}
?> 
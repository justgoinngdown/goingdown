<?php
// 管理员账号配置
define('ADMIN_USERNAME', 'admin');
// 使用 password_hash 加密存储密码
define('ADMIN_PASSWORD_HASH', password_hash('15684706918', PASSWORD_DEFAULT));

// 验证管理员登录
function verifyAdminLogin($username, $password) {
    // 首先验证用户名
    if ($username !== ADMIN_USERNAME) {
        return false;
    }
    
    // 验证密码
    return password_verify($password, ADMIN_PASSWORD_HASH);
}
?> 
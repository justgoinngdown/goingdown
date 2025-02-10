<?php
// 管理员账号配置
define('ADMIN_USERNAME', 'admin');
// 使用 password_hash 加密存储密码
define('ADMIN_PASSWORD_HASH', password_hash('liu15588531537', PASSWORD_DEFAULT));

// 验证管理员登录
function verifyAdminLogin($username, $password) {
    if ($username === ADMIN_USERNAME && password_verify($password, ADMIN_PASSWORD_HASH)) {
        return true;
    }
    return false;
}
?> 
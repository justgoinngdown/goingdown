<?php
// 启用session
session_start();

// 清除所有会话数据
session_destroy();

// 返回成功响应
header('Content-Type: application/json');
echo json_encode(['success' => true, 'message' => '已成功退出登录']);
?> 
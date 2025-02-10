<?php
session_start();

// 清除所有会话数据
session_destroy();

// 返回成功响应
echo json_encode(['success' => true, 'message' => '已成功退出登录']);
?> 
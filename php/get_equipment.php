<?php
// 引入认证中间件
require_once 'auth_middleware.php';
// 引入数据库配置
require_once '../config/db_config.php';

try {
    $conn = getDBConnection();
    
    // 准备SQL语句
    $sql = "SELECT * FROM equipment ORDER BY id DESC";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    
    // 获取所有结果
    $equipment = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // 返回JSON响应
    header('Content-Type: application/json');
    echo json_encode([
        'success' => true,
        'data' => $equipment
    ]);
    
} catch (Exception $e) {
    // 返回错误响应
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => '获取设备信息失败：' . $e->getMessage()
    ]);
}
?> 
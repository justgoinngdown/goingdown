<?php
// 引入认证中间件
require_once 'auth_middleware.php';
// 引入数据库配置
require_once '../config/db_config.php';

// 处理POST请求
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $conn = getDBConnection();
        
        // 获取POST数据
        $name = isset($_POST['name']) ? trim($_POST['name']) : '';
        $model = isset($_POST['model']) ? trim($_POST['model']) : '';
        $description = isset($_POST['description']) ? trim($_POST['description']) : '';
        
        // 验证数据
        if (empty($name) || empty($model)) {
            throw new Exception('设备名称和型号不能为空');
        }
        
        // 准备SQL语句
        $sql = "INSERT INTO equipment (name, model, description) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$name, $model, $description]);
        
        // 返回成功响应
        echo json_encode([
            'success' => true,
            'message' => '设备信息保存成功',
            'id' => $conn->lastInsertId()
        ]);
        
    } catch (Exception $e) {
        // 返回错误响应
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => $e->getMessage()
        ]);
    }
} else {
    // 非POST请求返回405错误
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => '不支持的请求方法'
    ]);
}
?> 
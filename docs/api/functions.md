# 云函数

## 简介

云函数是运行在 Bmob 云端的代码片段,您可以用它来实现较复杂的业务逻辑,而无需管理服务器。通过 REST API,您可以在客户端调用这些云函数。

## 调用方法

### 基础调用

请求示例:

```bash
curl -X POST \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  -H "Content-Type: application/json" \
  -d '{"name":"张三"}' \
  https://api.bmob.cn/1/functions/hello
```

响应示例:

```json
{
  "result": "你好,张三"
}
```

### 无参数调用

请求示例:

```bash
curl -X POST \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  -H "Content-Type: application/json" \
  -d '{}' \
  https://api.bmob.cn/1/functions/test
```

注意:即使不需要参数,也必须传入空对象 '{}'

### 复杂参数调用

请求示例:

```bash
curl -X POST \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  -H "Content-Type: application/json" \
  -d '{
    "user": {
      "name": "张三",
      "age": 18
    },
    "type": "register",
    "platform": "ios"
  }' \
  https://api.bmob.cn/1/functions/userRegister
```

## 云函数限制

1. 超时时间:30秒
2. 内存限制:256MB
3. 代码大小:128KB
4. 并发请求:基础版10次/秒

## 使用场景

1. 数据验证
- 注册前检查用户名是否合法
- 发帖前过滤敏感词
- 预约前检查时间段是否可用

2. 数据聚合
- 获取用户总消费金额
- 统计商品销量排行
- 计算用户积分等级

3. 第三方服务集成
- 发送短信验证码
- 推送消息通知
- 支付结果处理

4. 定时任务
- 每日数据统计
- 定期清理临时数据
- 自动更新缓存

## 错误码说明

错误码 | 描述 | 处理方法
-------|------|----------
141 | 云函数不存在 | 检查函数名称是否正确
142 | 云函数超时 | 优化代码执行效率
143 | 调用失败 | 检查参数格式是否正确
144 | 权限不足 | 确认应用权限配置

## 开发建议

1. 代码规范
- 使用 async/await 处理异步
- 规范错误处理流程
- 添加适当的注释说明

2. 性能优化
- 合理使用缓存
- 避免死循环和深层嵌套
- 减少数据库查询次数

3. 安全防护
- 验证输入参数
- 过滤敏感信息
- 控制访问权限

4. 调试方法
- 使用 console.log 打印日志
- 设置断点调试
- 分步骤验证功能

5. 发布流程
- 本地充分测试
- 先在测试环境验证
- 分批次灰度发布

## 示例代码

用户注册示例:

```bash
curl -X POST \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test",
    "password": "123456",
    "email": "test@example.com"
  }' \
  https://api.bmob.cn/1/functions/register
```

响应结果:

```json
{
  "result": {
    "code": 200,
    "msg": "注册成功",
    "data": {
      "objectId": "x123456789",
      "username": "test",
      "email": "test@example.com",
      "createdAt": "2023-12-20 10:00:00"
    }
  }
}
```

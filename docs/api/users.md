# 用户管理

## 用户注册
创建一个新的用户账号。

请求示例：

```bash
curl -X POST \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  -H "Content-Type: application/json" \
  -d '{"username":"cooldude","password":"p_n7!-e8","phone":"415-392-0202"}' \
  https://api.bmob.cn/1/users
```

响应示例：

```json
{
  "createdAt": "2011-11-07 20:58:34",
  "objectId": "Kc3M222J",
  "sessionToken": "pnktnjyb996sj4p156gjtp4im"
}
```

## 用户登录
验证用户身份并获取 session token。

请求示例：

```bash
curl -X GET \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  https://api.bmob.cn/1/login?username=cooldude&password=p_n7!-e8
```

响应示例：

```json
{
  "username": "cooldude",
  "createdAt": "2011-11-07 20:58:34",
  "updatedAt": "2011-11-07 20:58:34",
  "objectId": "Kc3M222J",
  "sessionToken": "pnktnjyb996sj4p156gjtp4im",
  "phone": "415-392-0202"
}
```

## 获取当前用户
获取当前登录用户的信息。

请求示例：

```bash
curl -X GET \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  -H "X-Bmob-Session-Token: pnktnjyb996sj4p156gjtp4im" \
  https://api.bmob.cn/1/users/me
```

## 更新用户
更新已登录用户的信息。

请求示例：

```bash
curl -X PUT \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  -H "X-Bmob-Session-Token: pnktnjyb996sj4p156gjtp4im" \
  -H "Content-Type: application/json" \
  -d '{"phone":"415-369-6201"}' \
  https://api.bmob.cn/1/users/Kc3M222J
```

## 删除用户
删除一个用户账号（需要超级权限）。

请求示例：

```bash
curl -X DELETE \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  -H "X-Bmob-Master-Key: Your Master Key" \
  https://api.bmob.cn/1/users/Kc3M222J
```

## 重置密码
通过邮箱重置用户密码。

请求示例：

```bash
curl -X POST \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  -H "Content-Type: application/json" \
  -d '{"email":"cooldude@example.com"}' \
  https://api.bmob.cn/1/requestPasswordReset
```

## 邮箱验证
请求发送验证邮件。

请求示例：

```bash
curl -X POST \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  -H "Content-Type: application/json" \
  -d '{"email":"cooldude@example.com"}' \
  https://api.bmob.cn/1/requestEmailVerify
```

## 查询用户
查询用户数据。

请求示例：

```bash
curl -X GET \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  https://api.bmob.cn/1/users?where={"username":"cooldude"}
```

## 关联第三方账号
关联用户账号与第三方平台。

请求示例：

```bash
curl -X PUT \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  -H "X-Bmob-Session-Token: pnktnjyb996sj4p156gjtp4im" \
  -H "Content-Type: application/json" \
  -d '{"authData":{"weixin":{"uid":"123456789","access_token":"abc123","expires_in":7200}}}' \
  https://api.bmob.cn/1/users/Kc3M222J
```

## 注意事项

1. 用户密码在传输和存储时都应该进行加密
2. 敏感操作需要验证 sessionToken
3. 用户删除操作不可逆，请谨慎使用
4. 密码重置链接有效期为24小时
5. 邮箱验证状态可以通过 emailVerified 字段查看 
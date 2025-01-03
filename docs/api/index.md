# Bmob RESTful API 文档

## 简介

Bmob 提供了强大的 RESTful API，让开发者能够通过 HTTP 请求进行数据操作。本文档详细介绍了 API 的使用方法，包括如何进行身份验证、数据的增删改查等操作。

## 快速入门

### 基础 URL
所有 API 请求都使用以下基础 URL：
`https://api.bmob.cn/1/`

### 请求格式
所有的 API 请求都应该使用 HTTPS，并且需要在 Header 中包含以下信息：

- `X-Bmob-Application-Id`: 您的应用 ID
- `X-Bmob-REST-API-Key`: 您的 REST API Key
- `Content-Type`: application/json

### 响应格式
所有响应都是 JSON 格式，默认返回以下字段：
- objectId: 数据的唯一标识符
- createdAt: 数据的创建时间
- updatedAt: 数据的最后更新时间

## 数据操作

### 创建数据
向一个数据表添加一条记录。

请求示例：

curl -X POST \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  -H "Content-Type: application/json" \
  -d '{"score":1337,"playerName":"Sean Plott","cheatMode":false}' \
  https://api.bmob.cn/1/classes/GameScore

响应示例：

{
  "createdAt": "2011-08-20 02:06:57",
  "objectId": "e1kXT22L"
}

### 查询数据

#### 获取单个对象
通过 objectId 获取单个对象的详细信息。

请求示例：

curl -X GET \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  https://api.bmob.cn/1/classes/GameScore/e1kXT22L

#### 查询多个对象
获取一个数据表中的多个对象。

请求示例：

curl -X GET \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  https://api.bmob.cn/1/classes/GameScore

### 更新数据
更新一个已经存在的对象。

请求示例：

curl -X PUT \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  -H "Content-Type: application/json" \
  -d '{"score":73453}' \
  https://api.bmob.cn/1/classes/GameScore/e1kXT22L

### 删除数据
删除一个已经存在的对象。

请求示例：

curl -X DELETE \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  https://api.bmob.cn/1/classes/GameScore/e1kXT22L

## 查询约束

### 基础查询
使用 where 参数进行基础的相等查询：

{
  "where": {
    "playerName": "Sean Plott"
  }
}

### 比较查询
支持多种比较查询操作符：

{
  "where": {
    "score": {
      "$gt": 1000
    }
  }
}

支持的比较操作符：
- `$lt`: 小于
- `$lte`: 小于等于
- `$gt`: 大于
- `$gte`: 大于等于
- `$ne`: 不等于
- `$in`: 包含在数组中
- `$nin`: 不包含在数组中
- `$exists`: 字段是否存在
- `$select`: 匹配另一个查询的返回值
- `$dontSelect`: 排除另一个查询的返回值
- `$all`: 包含所有给定的值
- `$regex`: 正则表达式匹配

### 复合查询
使用 $or 和 $and 进行复合查询：

{
  "where": {
    "$or": [
      {"wins": {"$gt": 150}},
      {"wins": {"$lt": 5}}
    ]
  }
}

### 排序
使用 order 参数进行排序，前缀 `-` 表示降序：

curl -X GET \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  https://api.bmob.cn/1/classes/GameScore?order=-score,name

### 分页查询
使用 limit 和 skip 参数进行分页：

curl -X GET \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  https://api.bmob.cn/1/classes/GameScore?limit=20&skip=20

### 计数查询
使用 count 参数获取查询结果的数量：

curl -X GET \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  https://api.bmob.cn/1/classes/GameScore?count=1&limit=0

## 用户管理

### 用户注册
创建一个新的用户账号。

请求示例：

curl -X POST \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  -H "Content-Type: application/json" \
  -d '{"username":"cooldude","password":"p_n7!-e8","phone":"415-392-0202"}' \
  https://api.bmob.cn/1/users

### 用户登录
验证用户身份并获取 session token。

请求示例：

curl -X GET \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  https://api.bmob.cn/1/login?username=cooldude&password=p_n7!-e8

### 获取当前用户
获取当前登录用户的信息。

请求示例：

curl -X GET \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  -H "X-Bmob-Session-Token: r:pnktnjyb996sj4p156gjtp4im" \
  https://api.bmob.cn/1/users/me

## 文件管理

### 上传文件
上传文件到 Bmob 云存储。

请求示例：

curl -X POST \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  -H "Content-Type: image/jpeg" \
  --data-binary "@myPicture.jpg" \
  https://api.bmob.cn/2/files/pic.jpg

### 删除文件
删除已上传的文件。

请求示例：

curl -X DELETE \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  https://api.bmob.cn/2/files/pic.jpg

## 云函数

### 调用云函数
调用已经部署的云函数。

请求示例：

curl -X POST \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  -H "Content-Type: application/json" \
  -d '{"name": "张三"}' \
  https://api.bmob.cn/1/functions/hello

## 错误处理

当 API 请求失败时，会返回对应的错误码和错误信息：

{
  "code": 101,
  "error": "object not found for e1kXT22L"
}

### 常见错误码

| 错误码 | 描述 |
|--------|------|
| 101 | 对象不存在 |
| 202 | 用户名已存在 |
| 205 | 找不到用户 |
| 206 | 密码不正确 |
| 301 | 权限不足 |

## 安全建议

1. 不要在客户端存储 REST API Key
2. 使用 ACL 控制数据访问权限
3. 在服务器端进行敏感操作
4. 定期更新 SDK 版本
5. 使用 HTTPS 进行所有 API 请求
6. 对敏感数据进行加密存储
7. 定期备份重要数据

## 更多资源

- [完整 API 文档](https://doc.bmob.cn/data/restful/develop_doc/)
- [开发者社区](https://community.bmob.cn)
- [技术支持](https://support.bmob.cn)
- [SDK 下载](https://www.bmob.cn/downloads)
- [控制台](https://www.bmob.cn/console)
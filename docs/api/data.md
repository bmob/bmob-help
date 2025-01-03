# 数据操作

## 创建数据
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

## 批量创建数据
一次创建多条数据记录。

请求示例：

curl -X POST \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  -H "Content-Type: application/json" \
  -d '{
    "requests": [
      {
        "method": "POST",
        "path": "/1/classes/GameScore",
        "body": {
          "score": 1337,
          "playerName": "Sean Plott"
        }
      },
      {
        "method": "POST",
        "path": "/1/classes/GameScore",
        "body": {
          "score": 1338,
          "playerName": "ZeroCool"
        }
      }
    ]
  }' \
  https://api.bmob.cn/1/batch

## 更新数据
更新一条已存在的数据记录。

请求示例：

curl -X PUT \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  -H "Content-Type: application/json" \
  -d '{"score":73453}' \
  https://api.bmob.cn/1/classes/GameScore/e1kXT22L

## 计数器
原子计数器可以让计数字段自增或自减。

请求示例：

curl -X PUT \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  -H "Content-Type: application/json" \
  -d '{"score":{"__op":"Increment","amount":1}}' \
  https://api.bmob.cn/1/classes/GameScore/e1kXT22L

## 数组操作
向数组字段添加或删除元素。

### 添加元素

curl -X PUT \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  -H "Content-Type: application/json" \
  -d '{
    "skills": {
      "__op": "Add",
      "objects": ["flying", "kungfu"]
    }
  }' \
  https://api.bmob.cn/1/classes/GameScore/e1kXT22L

### 删除元素

curl -X PUT \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  -H "Content-Type: application/json" \
  -d '{
    "skills": {
      "__op": "Remove",
      "objects": ["flying"]
    }
  }' \
  https://api.bmob.cn/1/classes/GameScore/e1kXT22L

## 删除数据
删除一条数据记录。

请求示例：

curl -X DELETE \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  https://api.bmob.cn/1/classes/GameScore/e1kXT22L

## 删除字段
删除对象中的某个字段。

请求示例：

curl -X PUT \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  -H "Content-Type: application/json" \
  -d '{"fieldName":{"__op":"Delete"}}' \
  https://api.bmob.cn/1/classes/GameScore/e1kXT22L

## 数据关联

### 添加关联
创建对象时可以关联其他对象。

请求示例：

curl -X POST \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  -H "Content-Type: application/json" \
  -d '{
    "playerName": "Sean Plott",
    "game": {
      "__type": "Pointer",
      "className": "Game",
      "objectId": "game123"
    }
  }' \
  https://api.bmob.cn/1/classes/GameScore

### 查询关联对象
查询时可以返回关联对象的详细信息。

请求示例：

curl -X GET \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  https://api.bmob.cn/1/classes/GameScore?include=game

### 关联数组
一个对象可以关联多个其他对象。

请求示例：

curl -X POST \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  -H "Content-Type: application/json" \
  -d '{
    "playerName": "Sean Plott",
    "games": {
      "__type": "Relation",
      "objects": [
        {
          "__type": "Pointer",
          "className": "Game",
          "objectId": "game123"
        },
        {
          "__type": "Pointer",
          "className": "Game",
          "objectId": "game456"
        }
      ]
    }
  }' \
  https://api.bmob.cn/1/classes/GameScore

## 原子操作

### 原子计数
对数字字段进行原子增减操作。

请求示例：

curl -X PUT \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  -H "Content-Type: application/json" \
  -d '{
    "score": {
      "__op": "Increment",
      "amount": 1
    }
  }' \
  https://api.bmob.cn/1/classes/GameScore/e1kXT22L

### 数组原子操作
对数组字段进行原子添加或删除操作。

请求示例：

curl -X PUT \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  -H "Content-Type: application/json" \
  -d '{
    "skills": {
      "__op": "AddUnique",
      "objects": ["flying"]
    }
  }' \
  https://api.bmob.cn/1/classes/GameScore/e1kXT22L

## 批量操作

### 批量更新
一次更新多条数据。

请求示例：

curl -X POST \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  -H "Content-Type: application/json" \
  -d '{
    "requests": [
      {
        "method": "PUT",
        "path": "/1/classes/GameScore/e1kXT22L",
        "body": {
          "score": 999
        }
      },
      {
        "method": "PUT",
        "path": "/1/classes/GameScore/a2kXT34M",
        "body": {
          "score": 888
        }
      }
    ]
  }' \
  https://api.bmob.cn/1/batch

### 批量删除
一次删除多条数据。

请求示例：

curl -X POST \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  -H "Content-Type: application/json" \
  -d '{
    "requests": [
      {
        "method": "DELETE",
        "path": "/1/classes/GameScore/e1kXT22L"
      },
      {
        "method": "DELETE",
        "path": "/1/classes/GameScore/a2kXT34M"
      }
    ]
  }' \
  https://api.bmob.cn/1/batch

## 注意事项

1. 批量操作每次最多支持50条记录
2. 数据更新操作会自动更新 updatedAt 字段
3. 删除操作是不可逆的，请谨慎操作
4. 关联对象的操作要注意维护数据一致性
5. 原子操作可以避免并发问题
6. 建议使用批量操作来提高性能
7. 数据操作需要合适的 ACL 权限

## 错误处理

常见错误码：

| 错误码 | 描述 |
|--------|------|
| 101 | 对象不存在 |
| 111 | 字段类型不匹配 |
| 136 | 操作超过限制 |
| 137 | 重复的值 |
| 139 | 角色名无效 | 
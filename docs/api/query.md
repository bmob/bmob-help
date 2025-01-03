# 查询操作

## 基础查询
使用 where 参数进行基础的相等查询。

请求示例：

```bash
curl -X GET \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  https://api.bmob.cn/1/classes/GameScore?where={"playerName":"Sean Plott"}
```

## 条件查询

### 比较查询
支持各种比较操作符。

请求示例：

```bash
curl -X GET \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  https://api.bmob.cn/1/classes/GameScore?where={"score":{"$gt":1000}}
```

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

### 数组查询
查询数组字段。

请求示例：

```bash
curl -X GET \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  https://api.bmob.cn/1/classes/GameScore?where={"skills":{"$all":["flying","kungfu"]}}
```

### 字符串查询
使用正则表达式进行模糊查询。

请求示例：

```bash
curl -X GET \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  https://api.bmob.cn/1/classes/GameScore?where={"playerName":{"$regex":"^Sean"}}
```

## 复合查询

### AND 查询
默认情况下，where 条件是 AND 关系。

请求示例：

```bash
curl -X GET \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  https://api.bmob.cn/1/classes/GameScore?where={"score":{"$gt":1000},"playerName":"Sean Plott"}
```

### OR 查询
使用 $or 操作符进行或查询。

请求示例：

```bash
curl -X GET \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  https://api.bmob.cn/1/classes/GameScore?where={"$or":[{"score":{"$gt":1000}},{"playerName":"Sean Plott"}]}
```

## 结果控制

### 排序
使用 order 参数控制结果排序。

请求示例：

```bash
curl -X GET \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  https://api.bmob.cn/1/classes/GameScore?order=-score,name
```

### 分页查询
使用 limit 和 skip 参数进行分页。

请求示例：

```bash
curl -X GET \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  https://api.bmob.cn/1/classes/GameScore?limit=20&skip=20
```

### 字段选择
使用 keys 参数选择返回的字段。

请求示例：

```bash
curl -X GET \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  https://api.bmob.cn/1/classes/GameScore?keys=score,playerName
```

## 关联查询

### include 查询
使用 include 参数返回关联对象的详细信息。

请求示例：

```bash
curl -X GET \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  https://api.bmob.cn/1/classes/GameScore?include=game
```

### 关联表查询
查询关联表中的数据。

请求示例：

```bash
curl -X GET \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  https://api.bmob.cn/1/classes/GameScore?where={"game":{"$inQuery":{"where":{"type":"RPG"},"className":"Game"}}}
```

## 计数查询

### 获取总数
使用 count 参数获取查询结果的总数。

请求示例：

```bash
curl -X GET \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  https://api.bmob.cn/1/classes/GameScore?count=1&limit=0
```

## 注意事项

1. 查询结果默认最多返回 100 条记录
2. skip 值越大查询性能越低，建议使用 createdAt 等字段进行分页查询
3. 复合查询可能会影响查询性能
4. 正则表达式查询不会使用索引
5. include 查询最多支持 3 层嵌套
6. 建议合理使用索引来提升查询性能

## 错误处理

常见错误码：

| 错误码 | 描述 |
|--------|------|
| 101 | 查询的对象不存在 |
| 102 | 查询参数无效 |
| 117 | 参数格式不正确 |
| 119 | 操作失败，权限不足 | 
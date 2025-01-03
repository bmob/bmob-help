# 文件管理

## 文件上传

### 普通上传
直接上传文件内容。

请求示例：

```bash
curl -X POST \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  -H "Content-Type: image/jpeg" \
  --data-binary "@myPicture.jpg" \
  https://api.bmob.cn/2/files/pic.jpg
```

响应示例：

```json
{
  "filename": "pic.jpg",
  "url": "http://bmob-cdn-1.b0.upaiyun.com/pic.jpg",
  "cdn": "upyun"
}
```

### Base64 上传
上传 Base64 编码的文件内容。

请求示例：

```bash
curl -X POST \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  -H "Content-Type: application/json" \
  -d '{
    "base64": "base64编码的文件内容",
    "filename": "pic.jpg"
  }' \
  https://api.bmob.cn/2/files/pic.jpg
```

### 文件关联
将文件关联到数据对象。

请求示例：

```bash
curl -X POST \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  -H "Content-Type: application/json" \
  -d '{
    "playerName": "Sean Plott",
    "picture": {
      "__type": "File",
      "url": "http://bmob-cdn-1.b0.upaiyun.com/pic.jpg",
      "cdn": "upyun"
    }
  }' \
  https://api.bmob.cn/1/classes/GameScore
```

## 文件删除

### 删除文件
删除已上传的文件。

请求示例：

```bash
curl -X DELETE \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  https://api.bmob.cn/2/files/upyun/pic.jpg
```

### 批量删除
一次删除多个文件。

请求示例：

```bash
curl -X POST \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  -H "Content-Type: application/json" \
  -d '{
    "urls": [
      "http://bmob-cdn-1.b0.upaiyun.com/pic1.jpg",
      "http://bmob-cdn-1.b0.upaiyun.com/pic2.jpg"
    ]
  }' \
  https://api.bmob.cn/2/files/batch/delete
```

## 文件访问

### 文件访问权限
文件访问权限分为：
- 公共读：所有人都可以访问
- 私有：需要授权才能访问

### 获取私有文件访问 URL
获取私有文件的临时访问链接。

请求示例：

```bash
curl -X GET \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  https://api.bmob.cn/2/files/token/pic.jpg
```

响应示例：

```json
{
  "url": "http://bmob-cdn-1.b0.upaiyun.com/pic.jpg?token=xxxx",
  "expires": 3600
}
```

## 图片处理

### 图片缩放
通过 URL 参数对图片进行缩放处理。

示例：
http://bmob-cdn-1.b0.upaiyun.com/pic.jpg!100x100

支持的缩放参数：
- !{width}x{height} - 按指定尺寸缩放
- !{width}x - 按宽度等比缩放
- !x{height} - 按高度等比缩放

### 图片裁剪
通过 URL 参数对图片进行裁剪。

示例：
http://bmob-cdn-1.b0.upaiyun.com/pic.jpg!crop=100x100a10a10

支持的裁剪参数：
- crop={width}x{height}a{x}a{y} - 指定区域裁剪
- crop={width}x{height} - 居中裁剪

### 图片水印
为图片添加水印。

示例：
http://bmob-cdn-1.b0.upaiyun.com/pic.jpg!watermark=text:Hello

支持的水印参数：
- watermark=text:{text} - 文字水印
- watermark=image:{url} - 图片水印
- watermark=text:{text},color:{color} - 指定文字颜色
- watermark=text:{text},size:{size} - 指定文字大小
- watermark=text:{text},pos:{position} - 指定水印位置

### 图片质量
调整图片质量。

示例：
http://bmob-cdn-1.b0.upaiyun.com/pic.jpg!q75

支持的质量参数：
- !q{quality} - quality 取值 1-100，数值越大质量越高

### 图片格式转换
转换图片格式。

示例：
http://bmob-cdn-1.b0.upaiyun.com/pic.jpg!png

支持的格式：
- !png - 转换为 PNG 格式
- !jpg - 转换为 JPG 格式
- !webp - 转换为 WebP 格式
- !gif - 转换为 GIF 格式

## 文件安全

### 防盗链设置
可以设置域名白名单和 referer 防盗链。

请求示例：

```bash
curl -X PUT \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  -H "Content-Type: application/json" \
  -d '{
    "domains": ["example.com"],
    "referer": true,
    "allowEmpty": false
  }' \
  https://api.bmob.cn/2/files/security
```

参数说明：
- domains: 允许访问的域名列表
- referer: 是否开启 referer 防盗链
- allowEmpty: 是否允许空 referer

### 文件加密
支持对文件进行加密存储。

请求示例：

```bash
curl -X POST \
  -H "X-Bmob-Application-Id: Your Application ID" \
  -H "X-Bmob-REST-API-Key: Your REST API Key" \
  -H "Content-Type: application/json" \
  -d '{
    "encrypt": true,
    "key": "encryption_key",
    "algorithm": "AES-256-CBC"
  }' \
  https://api.bmob.cn/2/files/pic.jpg
```

## 注意事项

1. 文件大小限制
   - 图片文件：10MB
   - 视频文件：100MB
   - 其他文件：20MB

2. 支持的文件类型
   - 图片：jpg、jpeg、png、gif、bmp、webp
   - 视频：mp4、avi、mov、wmv、flv
   - 音频：mp3、wav、aac、ogg
   - 文档：pdf、doc、docx、xls、xlsx、ppt、pptx
   - 压缩：zip、rar、7z、tar、gz

3. 访问控制
   - 私有文件访问链接有效期为 1 小时
   - 建议使用 CDN 域名访问文件
   - 及时更新过期的访问链接

4. 性能优化
   - 使用适当的图片质量参数
   - 根据实际需求选择图片尺寸
   - 合理使用图片格式转换

## 错误处理

常见错误码：

| 错误码 | 描述 | 解决方案 |
|--------|------|----------|
| 101 | 文件不存在 | 检查文件路径是否正确 |
| 129 | 无效的文件类型 | 确认上传的文件类型是否支持 |
| 130 | 文件太大 | 压缩文件或分片上传 |
| 131 | 文件数量超出限制 | 减少批量操作的文件数量 |
| 132 | 文件删除失败 | 检查文件权限和状态 |
| 133 | 文件访问被拒绝 | 验证访问权限和 token |
| 134 | 文件上传失败 | 检查网络连接和请求参数 |
| 135 | 文件格式不支持 | 转换为支持的文件格式 |

## 最佳实践

1. 文件命名规范
   - 使用时间戳或 UUID 作为文件名
   - 避免使用中文和特殊字符
   - 保持文件扩展名的正确性

2. 目录组织
   - 按业务类型创建子目录
   - 避免单个目录下文件过多
   - 使用日期等规则划分目录

3. 安全防护
   - 开启防盗链保护
   - 使用 HTTPS 传输
   - 定期清理临时文件
   - 设置合理的文件权限

4. 性能优化
   - 使用 CDN 加速
   - 合理设置缓存策略
   - 使用图片处理参数
   - 选择合适的文件格式 
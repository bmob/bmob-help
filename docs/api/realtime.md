# 实时数据

## 简介

Bmob 的实时数据功能允许您在客户端和服务器之间实时同步数据。通过 WebSocket 连接，您可以实现数据的即时更新和推送。

## 开始使用

### 连接 WebSocket

首先，您需要建立 WebSocket 连接。以下是连接的示例代码：

```javascript
const socket = new WebSocket('wss://api.bmob.cn/1/realtime');

socket.onopen = function() {
  console.log('WebSocket connection established');
};

socket.onmessage = function(event) {
  const data = JSON.parse(event.data);
  console.log('Received data:', data);
};

socket.onclose = function() {
  console.log('WebSocket connection closed');
};
```

### 订阅数据

您可以通过发送订阅请求来监听特定数据表的变化。以下是订阅的示例：

```javascript
const subscribeData = {
  action: 'subscribe',
  className: 'GameScore',
  where: {
    playerName: 'Sean Plott'
  }
};

socket.send(JSON.stringify(subscribeData));
```

### 接收数据更新

当您订阅的数据发生变化时，您将收到实时更新。以下是接收更新的示例：

```javascript
socket.onmessage = function(event) {
  const data = JSON.parse(event.data);
  if (data.action === 'update') {
    console.log('Data updated:', data.object);
  }
};
```

## 取消订阅

如果您不再需要接收某个数据表的更新，可以发送取消订阅请求：

```javascript
const unsubscribeData = {
  action: 'unsubscribe',
  className: 'GameScore'
};

socket.send(JSON.stringify(unsubscribeData));
```

## 注意事项

1. WebSocket 连接需要在支持的浏览器中使用。
2. 确保在使用 WebSocket 之前，您的应用已正确配置。
3. 实时数据功能可能会增加服务器负担，请合理使用。

## 错误处理

在使用 WebSocket 时，您可能会遇到一些错误。以下是常见错误处理示例：

```javascript
socket.onerror = function(error) {
  console.error('WebSocket error:', error);
};
```

## 示例代码

以下是一个完整的实时数据示例：

```javascript
const socket = new WebSocket('wss://api.bmob.cn/1/realtime');

socket.onopen = function() {
  console.log('WebSocket connection established');

  const subscribeData = {
    action: 'subscribe',
    className: 'GameScore',
    where: {
      playerName: 'Sean Plott'
    }
  };

  socket.send(JSON.stringify(subscribeData));
};

socket.onmessage = function(event) {
  const data = JSON.parse(event.data);
  if (data.action === 'update') {
    console.log('Data updated:', data.object);
  }
};

socket.onclose = function() {
  console.log('WebSocket connection closed');
};

socket.onerror = function(error) {
  console.error('WebSocket error:', error);
}; 
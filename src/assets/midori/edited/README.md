# 编辑后图片存储说明

## 当前实现

由于浏览器安全限制，前端Vue应用无法直接写入文件系统。目前的实现方案：

### 存储方式
- **位置**: localStorage (浏览器本地存储)
- **格式**: base64编码的PNG图片
- **键名**: 图片路径 (如: `/src/assets/midori/edited/journal_123_456.png`)
- **值**: base64数据URL

### 数据结构
```javascript
// localStorage中的存储格式
{
  "/src/assets/midori/edited/journal_123_456.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "/src/assets/midori/edited/journal_123_456_thumb.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}
```

## 生产环境建议

### 方案1: 后端API保存
```javascript
// 发送到后端保存
const response = await fetch('/api/save-journal-image', {
  method: 'POST',
  body: JSON.stringify({
    imageData: canvas.toDataURL('image/png'),
    filename: `journal_${id}_${timestamp}.png`
  })
});
```

### 方案2: 云存储服务
- 使用AWS S3、阿里云OSS等服务
- 直接从前端上传到云存储
- 获取公开访问URL

### 方案3: 用户下载
```javascript
// 提供下载功能让用户保存到本地
function downloadImage(dataUrl, filename) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}
```

## 当前限制

1. **存储容量**: localStorage通常限制为5-10MB
2. **持久性**: 用户清除浏览器数据会丢失
3. **跨设备**: 无法在多设备间同步
4. **文件系统**: 不会真正创建文件

## 开发建议

在开发阶段，当前的localStorage方案足够测试功能。在部署到生产环境时，建议实现后端API来处理文件保存。
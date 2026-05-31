# 泰州市吉远船用附件有限公司网站编辑说明

这个版本是静态可编辑网站，不需要安装程序，也不需要打包。

## 文件入口

- 首页：`D:\website\index.html`
- 公司资料和产品目录：`D:\website\js\site-data.js`
- 页面样式：`D:\website\css\styles.css`
- 首页横幅图片：`D:\website\assets\hero-marine-valves.png`
- 公司图形标：`D:\website\assets\logo-jiyuan-mark.svg`
- 公司横版标：`D:\website\assets\logo-jiyuan-horizontal.svg`
- 深色背景横版标：`D:\website\assets\logo-jiyuan-horizontal-light.svg`
- 公司标预览：`D:\website\logo-preview.html`

## 修改公司信息

打开 `D:\website\js\site-data.js`，修改 `company` 里的内容，例如：

```js
name: "泰州市吉远船用附件有限公司",
contactPerson: "王俊",
address: "泰州市海陵区苏陈镇西石羊村十三组",
phones: ["13914400275"]
```

保存后刷新 `index.html` 即可看到变化。

## 修改产品目录

打开 `D:\website\js\site-data.js`，修改 `products` 数组。每个产品包含：

- `category`：产品分类
- `title`：产品名称
- `summary`：产品简介
- `scene`：适用场景
- `service`：服务方式
- `features`：产品要点列表

复制已有产品块即可新增产品，删除对应产品块即可移除产品。

## 后续上线

如需发布到服务器，只要把 `D:\website` 整个文件夹上传到网站空间根目录即可。

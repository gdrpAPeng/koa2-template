# 基于 koa2 脚手架

## 目录结构

- bin
- controllers
    - 控制器模块, 处理一些业务
- db
    - 数据模块，封装数据库
- models
    - 模型层，这里负责操作数据库
- public
- routes
    - 路由层，获取到参数跳转控制器层处理
- utils
- views

## Node 生成网页快照

### [代码地址](https://github.com/gdrpAPeng/koa2-template/blob/master/routes/tools.js)

这里用的是 phantom

### 1、安装依赖
```
npm install phantom
```

### 2、引入 phantom
```
const phantom = require("phantom");
```

### 3、效果
> 这里遇到个问题，在 windows 上运行没啥问题，放到 linux 就出现乱码，发现是缺少字体的问题
```
// 根据系统选择以下命令
// centos
yum install bitmap-fonts bitmap-fonts-cjk 
// ubuntu
apt-get install xfonts-wqy
```
可能会因为字体问题导致效果不一致

#### windows 下效果
![windows-image](http://144.34.199.163:3000/images/windows-image.png)
#### linux 下效果
![linux-image](http://144.34.199.163:3000/images/linux-image.png)
#### linux 下乱码效果
![linux-no-image](http://144.34.199.163:3000/images/linux-no-image.png)




#### 代码

```js
const phantom = require("phantom");

router.post("/html2Image", async ctx => {
   // 初始化配置
   const initConfig = {
    width: 1024,
    height: 800
  };

  const { url, viewPort = {}, width, height } = JSON.parse(ctx.request.body);
  // 调用 phantom
  const instance = await phantom.create();
  const page = await instance.createPage();
  // 配置视图
  page.property("viewportSize", {
    width: viewPort.width || initConfig.width,
    height: viewPort.height || initConfig.height
  });
  // 配置截取区域
  // 默认截取整个页面
  // page.property('clipRect', {
  //     top: 0,
  //     left: 0,
  //     width: width || 1024,
  //     height: height || 800
  // })
  
  const status = await page.open(url);

  const timestamp = new Date().getTime();
  // 生成图片
  await page.render(`./public/screenshot/${timestamp}.png`);
  await instance.exit();

  ctx.response.type = "json";
  ctx.body = {
    status: status,
    width: width || initConfig.width,
    height: height || initConfig.height,
    viewPortWidth: viewPort.width || initConfig.width,
    viewPortHeight: viewPort.height || initConfig.height,
    url: "http://" + ctx.request.host + "/screenshot/" + timestamp + ".png"
  };
});
```



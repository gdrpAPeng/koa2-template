/*
 * @Author: APeng
 * @Date: 2019-05-16 15:18:59
 * @Last Modified by: APeng
 * @Last Modified time: 2019-05-16 17:26:20
 */
const router = require("koa-router")();

const phantom = require("phantom");

router.post('/html2Image', async ctx => {
    
    const { url, viewPort = {}, width, height } = JSON.parse(ctx.request.body)
    
    const instance = await phantom.create();
    const page = await instance.createPage();

    page.property('viewportSize', {
        width: viewPort.width || 1024,
        height: viewPort.height || 800
    })
    // page.property('clipRect', {
    //     top: 0,
    //     left: 0,
    //     width: width || 1024,
    //     height: height || 800
    // })

    const status = await page.open(url)

    const timestamp = new Date().getTime()

    await page.render(`./public/screenshot/${timestamp}.png`)
    await instance.exit()
    ctx.response.type = "json";
    ctx.body = {
        status: status,
        width: width || 1024,
        height: height || 800,
        viewPortWidth: viewPort.width || 1024,
        viewPortHeight: viewPort.height || 800,
        url: 'http://' + ctx.request.host + '/screenshot/' + timestamp + '.png'
    }
})

router.post("/", async ctx => {
  const instance = await phantom.create();
  const page = await instance.createPage();
  page.property("viewportSize", {
    width: 1024,
    height: 800
  });
  page.property("clipRect", {
    top: 0,
    left: 0,
    width: 1024,
    height: 800
  });
  //   page.settings = {
  //       javascriptEnabled: false,
  //       loadImages: true,
  //       userAgent: 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.31 (KHTML, like Gecko) PhantomJS/19.0'
  //   }
  //   await page.on('onResourceRequested', function(requestData) {
  //     console.info('Requesting', requestData.url);
  //   })
  //
  const status = await page.open(ctx.request.body.url);
  console.log(ctx.request.body.url);
  console.log("====================", status, "====================");
  // -- 抓取網頁内容
  //   const content = await page.property('content')
  // 生成圖片
  const timestamp = new Date().getTime();
  page.render(`./screenshot/${timestamp}.png`);

  await instance.exit();

  ctx.response.type = "json";
  ctx.body = {
    url: timestamp
  };
});

module.exports = router;

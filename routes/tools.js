/*
 * @Author: APeng
 * @Date: 2019-05-16 15:18:59
 * @Last Modified by: APeng
 * @Last Modified time: 2019-05-20 14:49:05
 */
const router = require("koa-router")();

const phantom = require("phantom");

router.post("/html2Image", async ctx => {
  const initConfig = {
    width: 1024,
    height: 800
  };

  const { url, viewPort = {}, width, height } = JSON.parse(ctx.request.body);

  const instance = await phantom.create();
  const page = await instance.createPage();

  page.property("viewportSize", {
    width: viewPort.width || initConfig.width,
    height: viewPort.height || initConfig.height
  });
  // page.property('clipRect', {
  //     top: 0,
  //     left: 0,
  //     width: width || 1024,
  //     height: height || 800
  // })

  const status = await page.open(url);

  const timestamp = new Date().getTime();

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

module.exports = router;

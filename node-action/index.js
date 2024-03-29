const http = require('http');
const server = http.createServer();
const {BuildRoute} = require("./buildRoute");
const {Result} = require("../src/lang/Result");
const {ResponseUtil} = require("./utils/ResponseUtil");
const {UrlUtil} = require("./utils/UrlUtil");
const {ConfigUtil} = require("./utils/ConfigUtil");
const {ErrorUtil} = require("./utils/ErrorUtil");
const {ModuleType} = require("./base/ModuleType");

BuildRoute.build((routes) => {
    // 启动服务
    server.on('request', function (request, response) {
        // 获取请求地址
        const url = request.url;
        const tempUrl = 'http://127.0.0.1/' + url;
        const urlObj = new URL(tempUrl);
        const pathname = urlObj.pathname.substring(2);

        // 获取请求参数
        const params = UrlUtil.getParams(tempUrl);
        // 将request和response注入到参数中
        params['HttpRequest'] = request;
        params['HttpResponse'] = response;

        ResponseUtil.allowCross(response);

        // 判断请求地址是否存在
        const routesKeys = Object.keys(routes);
        if (!routesKeys.includes(pathname)) {
            response.end(Result.fail('404'));
        }
        // 根据请求地址执行对应的方法并返回数据
        for (let routesKey in routes) {
            if (pathname === routesKey) {
                new Promise(async (resolve, reject) => {
                    try {
                        const route = routes[routesKey];
                        switch (route.type) {
                            case ModuleType.jsonAction:
                                ResponseUtil.setHeaderContentTypeJSON(response);
                                break;
                            case ModuleType.textAction:
                                ResponseUtil.setHeaderContentTypeText(response);
                                break;
                            default:
                                ResponseUtil.setHeaderContentTypeHtml(response);
                        }
                        // 执行对应的方法
                        const res = await route.method(params)
                        resolve(res);
                    } catch (e) {
                        reject(e);
                    }
                }).then(res => {
                    response.end(ResponseUtil.relResult(res));
                }).catch(e => {
                    console.error(e)
                    response.end(ErrorUtil.handle(e));
                })
            }
        }
    });
    server.listen(ConfigUtil.config.port, function () {
        console.log('服务器启动成功，端口号：' + server.address().port);
    });
});


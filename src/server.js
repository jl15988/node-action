const http = require('http');
const server = http.createServer();
const {BuildRoute} = require("./buildRoute");
const {Result} = require("./lang/Result");
const {config} = require("./config");
const {ResponseUtil} = require("./utils/ResponseUtil");
const {UrlUtil} = require("./utils/UrlUtil");
const {JSONUtil} = require("./utils/JSONUtil");
const {GlobalErrorAdvice} = require("./advice/GlobalErrorAdvice");

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

        ResponseUtil.setHeaderContentTypeJSON(response);
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
                        // 执行对应的方法
                        const res = await routes[routesKey](params)
                        resolve(res);
                    } catch (e) {
                        reject(e);
                    }
                }).then(res => {
                    response.end(ResponseUtil.relResult(res));
                }).catch(e => {
                    console.error(e)
                    // 处理异常，先判断有没有对应的全局异常处理，没有的话返回异常信息
                    const errorAdviceKeys = Object.getOwnPropertyNames(Object.getPrototypeOf(GlobalErrorAdvice))
                    for (let errorAdviceKey of errorAdviceKeys) {
                        if (errorAdviceKey === 'common' || (errorAdviceKey !== 'constructor' && e.constructor.name === errorAdviceKey)) {
                            try {
                                const errorRes = GlobalErrorAdvice[errorAdviceKey](e);
                                response.end(ResponseUtil.relResult(errorRes));
                                return;
                            } catch (e) {
                                response.end(e.message);
                                return;
                            }
                        }
                    }
                    response.end(e.message);
                })
            }
        }
    });
    server.listen(config.port, function () {
        console.log('服务器启动成功');
    });
});


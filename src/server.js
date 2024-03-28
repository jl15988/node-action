const http = require('http');
const server = http.createServer();
const {BuildRoute} = require("./buildRoute");
const {Result} = require("./lang/Result");

BuildRoute.build((routes) => {
    // 启动服务
    server.on('request', function (request, response) {
        // 获取请求地址
        const url = request.url;
        // 获取请求参数
        const urlObj = new URL('http://127.0.0.1/' + url);
        const pathname = urlObj.pathname.substring(2);
        const searchParams = new URLSearchParams(urlObj.search);
        const params = {};
        for (const [key, value] of searchParams) {
            params[key] = value;
        }
        // 设置响应内容类型
        response.setHeader('Content-Type', 'application/json; charset=utf8')
        // 允许跨域
        response.setHeader('Access-Control-Allow-Methods', '*') //允许哪些请求方式  *代表不限制
        response.setHeader('Access-Control-Allow-Origin', '*') //允许哪些请求域名  *代表不限制

        // 判断请求地址是否存在
        const routesKeys = Object.keys(routes);
        if (!routesKeys.includes(pathname)) {
            response.end(Result.fail('404'));
        }
        // 根据请求地址执行对应的方法并返回数据
        for (let routesKey in routes) {
            if (pathname === routesKey) {
                routes[routesKey](params).then(res => {
                    const result = Result.success(res);
                    response.end(result);
                }).catch(e => {
                    const result = Result.fail();
                    response.end(result);
                })
            }
        }
    });
    server.listen(9300, function () {
        console.log('服务器启动成功');
    });
});


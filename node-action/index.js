const http = require('http');
const server = http.createServer();
const {BuildRoute} = require("./buildRoute");
const {ResponseUtil} = require("./utils/ResponseUtil");
const {UrlUtil} = require("./utils/UrlUtil");
const {ConfigUtil} = require("./utils/ConfigUtil");
const {RequestUtil} = require("./utils/RequestUtil");
const {JSONUtil} = require("./utils/JSONUtil");

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

        if (ConfigUtil.config.allowCross) {
            ResponseUtil.allowCross(response);
        }

        RequestUtil.relPost(request).then(data => {
            const relParams = {
                request,
                response,
                routes,
                params,
                pathname
            }

            if (request.method === 'POST') {
                if (JSONUtil.isJSON(data)) {
                    params.data = Object.assign(params, JSON.parse(data));
                } else {
                    params.data = data;
                }
                relParams.params = params;
            }

            ResponseUtil.relRoute(relParams);
        });
    });
    server.listen(ConfigUtil.config.port, function () {
        console.log('服务器启动成功，端口号：' + server.address().port);
    });
});


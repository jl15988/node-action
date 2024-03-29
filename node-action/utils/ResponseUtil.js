const {JSONUtil} = require("./JSONUtil");
const {ContentType} = require("./ContentType");
const {ModuleType} = require("../base/ModuleType");
const {ErrorUtil} = require("./ErrorUtil");
const {PostMap} = require("../base/PostMap");
const {GetMap} = require("../base/GetMap");

/**
 * 响应工具
 */
class ResponseUtil {

    /**
     * 设置响应头返回内容为JSON格式
     */
    setHeaderContentTypeJSON(response) {
        response.setHeader('Content-Type', ContentType.APPLICATION_JSON + '; charset=utf8');
    }

    /**
     * 设置响应头返回内容为Text格式
     */
    setHeaderContentTypeText(response) {
        response.setHeader('Content-Type', ContentType.TEXT_PLAIN + '; charset=utf8');
    }

    /**
     * 设置响应头返回内容为Html格式
     */
    setHeaderContentTypeHtml(response) {
        response.setHeader('Content-Type', ContentType.TEXT_HTML + '; charset=utf8');
    }

    /**
     * 允许跨域请求
     */
    allowCross(response) {
        response.setHeader('Access-Control-Allow-Methods', '*') //允许哪些请求方式  *代表不限制
        response.setHeader('Access-Control-Allow-Origin', '*') //允许哪些请求域名  *代表不限制
    }

    /**
     * 处理响应结果
     * @param res 响应结果
     * @returns {string}
     */
    relResult(res) {
        if (!res) {
            return 'request error';
        }
        if (typeof res === 'string') {
            return res;
        } else if (JSONUtil.isJSON(res)) {
            return JSON.stringify(res);
        } else {
            return res.toString();
        }
    }

    /**
     * 处理路由并响应
     * @param routes 全部路由
     * @param pathname 请求路径
     * @param request 请求
     * @param response 响应
     * @param params 参数
     */
    async relRoute({routes, pathname, request, response, params}) {
        // 判断请求地址是否存在
        const routesKeys = Object.keys(routes);
        if (!routesKeys.includes(pathname.toLowerCase())) {
            response.writeHead(404);
            response.end('The request path does not exist');
            return;
        }
        // 根据请求地址执行对应的方法并返回数据
        for (let routesKey in routes) {
            if (pathname.toLowerCase() === routesKey) {
                try {
                    const route = routes[routesKey];
                    if (request.method === 'POST' && !(route.map instanceof PostMap)) {
                        continue;
                    }
                    if (request.method === 'GET' && !(route.map instanceof GetMap)) {
                        continue;
                    }
                    switch (route.type) {
                        case ModuleType.jsonAction:
                            this.setHeaderContentTypeJSON(response);
                            break;
                        case ModuleType.textAction:
                            this.setHeaderContentTypeText(response);
                            break;
                        default:
                            this.setHeaderContentTypeHtml(response);
                    }
                    // 执行对应的方法
                    const res = await route.handle(params);
                    response.end(this.relResult(res));
                    return;
                } catch (e) {
                    console.error(e)
                    response.end(ErrorUtil.handle(e));
                    return;
                }
            }
        }
        response.writeHead(404);
        response.end('The request path does not exist');
    }
}

exports.ResponseUtil = new ResponseUtil();

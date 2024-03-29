const {JSONUtil} = require("./JSONUtil");

/**
 * 响应工具
 */
class ResponseUtil {

    /**
     * 设置响应头返回内容为JSON格式
     */
    setHeaderContentTypeJSON(response) {
        response.setHeader('Content-Type', 'application/json; charset=utf8');
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
}

exports.ResponseUtil = new ResponseUtil();

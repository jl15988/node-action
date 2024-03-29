const querystring = require("querystring");

class RequestUtil {

    /**
     * 解析post请求
     * @param request 请求
     * @returns {Promise<unknown>}
     */
    relPost(request) {
        return new Promise((resolve, reject) => {
            if (request.method === 'POST') {
                try {
                    let body = '';

                    // 接收请求体数据
                    request.on('data', chunk => {
                        body += chunk.toString(); // 转换为字符串
                    });

                    request.on('end', () => {
                        // 解析请求体
                        resolve(body);
                    });
                } catch (e) {
                    reject(e);
                }
            } else {
                resolve();
            }
        });
    }
}

exports.RequestUtil = new RequestUtil();

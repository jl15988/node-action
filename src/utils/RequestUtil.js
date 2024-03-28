const https = require("https");

class RequestUtil {
    get(url) {
        return new Promise((resolve, reject) => {
            const req = https.get(url, (res) => {
                let data = '';

                // 接收数据片段
                res.on('data', (chunk) => {
                    data += chunk;
                });

                // 数据接收完毕
                res.on('end', () => {
                    resolve(JSON.parse(data));
                });
            });

            req.on('error', (e) => {
                console.error(`problem with request: ${e.message}`);
                reject(e);
            });
        })
    }
}

module.exports = new RequestUtil();

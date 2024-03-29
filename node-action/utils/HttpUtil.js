const https = require("https");
const {UrlUtil} = require("./UrlUtil");
const http = require("http");

/**
 * http工具
 */
class HttpUtil {

    /**
     * 获取请求
     * @param url {string} 请求地址
     */
    getRequest(url) {
        if (UrlUtil.isHttp(url)) {
            return http;
        }
        return https;
    }

    /**
     *
     * @param url {string} 请求地址
     * @param {{
     *     [key: string]: any
     * }} [params] 请求参数
     * @param {{
     *   agent?: Agent | boolean;
     *   auth?: string;
     *   createConnection?: Function;
     *   defaultPort?: number;
     *   family?: number;
     *   headers?: object;
     *   hints?: number;
     *   host?: string;
     *   hostname?: string;
     *   insecureHTTPParser?: boolean;
     *   localAddress?: string;
     *   localPort?: number;
     *   lookup?: Function;
     *   maxHeaderSize?: number;
     *   method?: string;
     *   path?: string;
     *   port?: number;
     *   protocol?: string;
     *   setHost?: boolean;
     *   socketPath?: string;
     *   timeout?: number;
     *   signal?: AbortSignal;
     *   } | string | URL} [options] 请求配置
     * @returns {Promise<http.ClientRequest>}
     */
    request(url, params, options) {
        return new Promise((resolve, reject) => {
            try {
                const req = this.getRequest(url).get(url, options, (res) => {
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
            } catch (e) {
                reject(e);
            }
        })
    }

    /**
     * get请求
     * @param url {string} 请求地址
     * @param {{
     *     [key: string]: any
     * }} [params] 参数
     * @returns {Promise<{[key: string]}>}
     */
    get(url, params) {
        return new Promise((resolve, reject) => {
            try {
                const req = this.getRequest(url).get(url, (res) => {
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
            } catch (e) {
                reject(e);
            }
        })
    }

    /**
     * post请求
     * @param url 请求地址
     * @param {{
     *     [key: string]: any
     * }} [data] 请求参数
     * @returns {Promise<unknown>}
     */
    post(url, data) {
        const postData = JSON.stringify(data ? data : {});
        return new Promise((resolve, reject) => {
            let request = https;
            if (UrlUtil.isHttp(url)) {
                request = http;
            }
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': postData.length
                }
            }
            const req = request.request(url, options, res => {
                res.on('data', (d) => {
                    process.stdout.write(d);
                });
            })

            req.on('error', (e) => {
                reject(e);
            });

            req.write(postData);
            req.end();
            resolve();
        })
    }
}

module.exports = new HttpUtil();

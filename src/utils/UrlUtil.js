/**
 * url工具
 */
class UrlUtil {

    /**
     * 获取请求参数
     * @param url {string} 请求地址
     * @returns {{
     *     [key: string]
     * }}
     */
    getParams(url) {
        const urlObj = new URL(url);
        const searchParams = new URLSearchParams(urlObj.search);
        const params = {};
        for (const [key, value] of searchParams) {
            params[key] = value;
        }
        return params;
    }

    /**
     * 获取url中的文件名称
     * @param url {string} 地址
     * @returns {string}
     */
    getUrlName(url) {
        const start = url.lastIndexOf("/");
        return start !== -1 ? url.substring(start + 1) : url;
    }

    /**
     * 判断地址是否http请求
     * @param url {string} 地址
     * @returns {boolean}
     */
    isHttps(url) {
        return this.getProtocol(url) === 'https';
    }

    /**
     * 判断地址是否https请求
     * @param url {string} 地址
     * @returns {boolean}
     */
    isHttp(url) {
        return this.getProtocol(url) === 'http';
    }

    /**
     * 获取地址协议
     * @param url {string} 地址
     * @returns {string}
     */
    getProtocol(url) {
        // 创建一个新的URL对象
        const urlObj = new URL(url);
        // 返回URL的协议部分
        return urlObj.protocol.slice(0, -1); // 去掉末尾的冒号
    }
}

exports.UrlUtil = new UrlUtil();

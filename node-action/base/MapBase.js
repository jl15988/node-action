class MapBase {

    /**
     * 请求方式
     */
    method;
    /**
     * 请求路径
     */
    path;
    /**
     * 处理函数
     */
    handle;

    constructor(pathOrHandle, handle) {
        if (handle) {
            this.path = pathOrHandle;
            this.handle = handle;
        } else {
            if (typeof pathOrHandle === 'function') {
                this.handle = pathOrHandle;
            } else {
                this.path = pathOrHandle;
            }
        }
    }

    setMethod(method) {
        this.method = method;
    }
}

exports.MapBase = MapBase;

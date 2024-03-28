/**
 * 响应结果
 */
class Result {
    code = 200;
    data = {};
    msg = '';

    constructor(code, msg, data) {
        this.code = code || 200;
        this.data = data || {};
        this.msg = msg || '';
    }

    static success(data) {
        return JSON.stringify(new Result(200, '请求成功', data));
    }

    static fail(msg) {
        return JSON.stringify(new Result(400, msg || '请求失败'));
    }
}

exports.Result = Result;

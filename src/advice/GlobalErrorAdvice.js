const {Result} = require("../lang/Result");

/**
 * 全局异常处理
 */
class GlobalErrorAdvice {
    CustomError(e) {
        return Result.fail(e.message);
    }

    common(e) {
        return Result.fail('系统异常');
    }
}

exports.GlobalErrorAdvice = new GlobalErrorAdvice();

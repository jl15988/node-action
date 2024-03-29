const {ConfigUtil} = require("./ConfigUtil");
const {ResponseUtil} = require("./ResponseUtil");


class ErrorUtil {

    /**
     * 处理响应错误
     * @param error 错误
     * @returns {string}
     */
    handle(error) {
        // 如果没有配置全局异常处理类则直接返回错误
        if (ConfigUtil.config.errorAdvice) {
            // 引入异常处理类
            const errorAdvice = require('..\\..\\' + ConfigUtil.config.errorAdvice);
            for (let adviceKey in errorAdvice) {
                const advice = errorAdvice[adviceKey];
                const errorAdviceKeys = Object.getOwnPropertyNames(Object.getPrototypeOf(advice))
                // 查找对应异常处理方法
                for (let errorAdviceKey of errorAdviceKeys) {
                    if (errorAdviceKey === 'common' || (errorAdviceKey !== 'constructor' && error.constructor.name === errorAdviceKey)) {
                        // 通用方法和与当前异常类名称相同的方法，进行调用
                        try {
                            const errorRes = advice[errorAdviceKey](error);
                            return ResponseUtil.relResult(errorRes);
                        } catch (e) {
                            return e.message;
                        }
                    }
                }
            }

        }
        return error.message;
    }
}

exports.ErrorUtil = new ErrorUtil();

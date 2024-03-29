const {FileUtil} = require("./FileUtil");

class ConfigUtil {

    isDefault = true;

    config = {
        // 端口号
        port: null,
        // 接口类扫描路径
        actionPath: '',
        // 全局异常处理类
        errorAdvice: ''
    }

    constructor() {
        const configName = 'node-action' + '-config.js';
        this.isDefault = !FileUtil.isExist(configName);
        if (!this.isDefault) {
            this.config = Object.assign(this.config, require('../../' + configName).config)
        }
    }
}

exports.ConfigUtil = new ConfigUtil();

const {BingImgData} = require("./domain/BingImgData");
const RequestUtil = require("../../../node-action/utils/HttpUtil");
const {ModuleType} = require("../../../node-action/base/ModuleType");
const {CustomError} = require("../../errors/CustomError");

class BingImg {

    type = ModuleType.jsonAction;
    static baseUrl = "https://www.bing.com/";
    static api = "https://www.bing.com/HPImageArchive.aspx?format={format}&n={number}"
    static formatMap = {
        js: "js",
        other: ""
    }

    async $$getData({number, format}) {
        const api = BingImg.api.replace("{format}", format || 'js').replace("{number}", number || '1');
        try {
            const res = await RequestUtil.get(api);
            return new BingImgData(res);
        } catch (e) {
            throw new CustomError('请求api失败');
        }
    }
}

exports.BingImg = new BingImg()

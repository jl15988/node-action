const {BingImgData} = require("./domain/BingImgData");
const RequestUtil = require("../../../node-action/utils/HttpUtil");
const {ModuleType} = require("../../../node-action/base/ModuleType");
const {CustomError} = require("../../errors/CustomError");
const {GetMap} = require("../../../node-action/base/GetMap");
const {Result} = require("../../lang/Result");
const {PostMap} = require("../../../node-action/base/PostMap");

class BingImg {

    type = ModuleType.jsonAction;
    static baseUrl = "https://www.bing.com/";
    static api = "https://www.bing.com/HPImageArchive.aspx?format={format}&n={number}"
    static formatMap = {
        js: "js",
        other: ""
    }

    getData = new GetMap(async ({number, format}) => {
        const api = BingImg.api.replace("{format}", format || 'js').replace("{number}", number || '1');
        try {
            const res = await RequestUtil.get(api);
            return new BingImgData(res);
        } catch (e) {
            throw new CustomError('请求api失败');
        }
    })

    setData = new PostMap('/set', ({ss}) => {
        console.log(ss)
        return Result.success('1')
    })
}

exports.BingImg = new BingImg()

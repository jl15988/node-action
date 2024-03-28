const {BingImgData} = require("./domain/BingImgData");
const RequestUtil = require("../../utils/RequestUtil");
const {ModuleType} = require("../base/ModuleType");

class BingImg {

    type = ModuleType.action;
    static baseUrl = "https://www.bing.com/";
    static api = "https://www.bing.com/HPImageArchive.aspx?format={format}&n={number}"
    static formatMap = {
        js: "js",
        other: ""
    }

    $$getData({number, format}) {
        return new Promise(async resolve => {
            const api = BingImg.api.replace("{format}", format || 'js').replace("{number}", number || '1');
            const res = await RequestUtil.get(api);
            if (res) {
                resolve(new BingImgData(res))
            }
            resolve('')
        })
    }
}

exports.BingImg = new BingImg()

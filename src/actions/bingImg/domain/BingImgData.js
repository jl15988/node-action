/**
 * 必应图片数据
 */
class BingImgData {
    baseUrl = "https://www.bing.com";
    url = "";

    data = {
        "images": [
            {
                "startdate": "",
                "fullstartdate": "",
                "enddate": "",
                "url": "",
                "urlbase": "",
                "copyright": "",
                "copyrightlink": "",
                "title": "",
                "quiz": "",
                "wp": false,
                "hsh": "",
                "drk": 0,
                "top": 0,
                "bot": 0,
                "hs": []
            }
        ],
        "tooltips": {
            "loading": "",
            "previous": "",
            "next": "",
            "walle": "",
            "walls": ""
        }
    }

    constructor(data) {
        if (!data) return;
        this.data = data;
        this.url = this.baseUrl + data.images[0].urlbase + '_UHD.jpg';
    }
}

exports.BingImgData = BingImgData;

const {MapBase} = require("./MapBase");
const {MapType} = require("./MapType");

class PostMap extends MapBase {

    constructor(pathOrHandle, handle) {
        super(pathOrHandle, handle).setMethod(MapType.POST);
    }
}

exports.PostMap = PostMap;

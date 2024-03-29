const {MapBase} = require("./MapBase");
const {MapType} = require("./MapType");

class GetMap extends MapBase {

    constructor(pathOrHandle, handle) {
        super(pathOrHandle, handle).setMethod(MapType.GET);
    }
}

exports.GetMap = GetMap;

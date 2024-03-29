class JSONUtil {
    /**
     * 判断是否JSON
     * @param obj 判断对象
     * @returns {boolean}
     */
    isJSON(obj) {
        if (typeof obj !== 'object' || obj === null) {
            return false;
        }

        try {
            JSON.parse(JSON.stringify(obj));
            return true;
        } catch (e) {
            return false;
        }
    }
}

exports.JSONUtil = new JSONUtil();

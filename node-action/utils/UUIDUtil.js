/**
 * UUID工具
 */
class UUIDUtil {


    /**
     * 生成UUID
     * @param simple {boolean} 是否简单的
     * @returns {string}
     */
    uuid(simple) {
        let d = new Date().getTime();
        let template = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
        if (simple) {
            template = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx";
        }
        return template.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
}

exports.UUIDUtil = new UUIDUtil();

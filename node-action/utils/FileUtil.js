const fs = require("fs");
const path = require("path");

class FileUtil {
    /**
     * 获取文件加下的所有文件
     * @param directory {string | Buffer |URL}
     */
    getFilesInDirectory(directory) {
        return new Promise((resolve, reject) => {
            fs.readdir(directory, async (error, files) => {
                if (error) {
                    return reject(error);
                }
                let resArr = [];
                // 获取完整路径
                const fullPathFiles = files.map(file => path.join(directory, file));
                for (let fullPathFile of fullPathFiles) {
                    if (fs.statSync(fullPathFile).isDirectory()) {
                        const res = await this.getFilesInDirectory(fullPathFile);
                        if (res) {
                            resArr = resArr.concat(res);
                        }
                    } else {
                        resArr.push(fullPathFile);
                    }
                }
                resolve(resArr);
            });
        });
    }



    /**
     * 判断文件是否存在
     * @param path {string | Buffer |URL}
     * @returns {boolean}
     */
    isExist(path) {
        return fs.existsSync(path);
    }
}

exports.FileUtil = new FileUtil()

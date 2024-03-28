const {FileUtil} = require("./utils/FileUtil");

/**
 * 构建路由
 */
class BuildRoute {

    build(cb) {
        // 获取所有module，并组装地址
        FileUtil.getFilesInDirectory('src/modules').then(modules => {
            const actions = {};
            for (let module of modules) {
                // 引入模块儿
                const path = module.replace("src", ".");
                const req = require(path);
                for (let reqKey in req) {
                    if ('BaseModule' === reqKey) continue;
                    const moduleInstance = req[reqKey];
                    if (moduleInstance.type && moduleInstance.type === 'action') {
                        actions[reqKey] = moduleInstance;
                    }
                }
            }
            // 组装路由
            const routes = {};
            for (let k in actions) {
                const action = actions[k];
                const propertyNames = Object.getOwnPropertyNames(Object.getPrototypeOf(action));
                const methods = propertyNames.filter(prop => typeof action[prop] === 'function' && prop.startsWith('$$'));
                for (let method of methods) {
                    routes[k + '/' + method.replace('$$', '')] = action[method];
                }
            }

            cb && cb(routes);
        });
    }
}

exports.BuildRoute = new BuildRoute();

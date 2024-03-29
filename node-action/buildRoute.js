const {FileUtil} = require("./utils/FileUtil");
const {ModuleType} = require("./base/ModuleType");
const {ConfigUtil} = require("./utils/ConfigUtil");
const {ActionRoute} = require("./base/ActionRoute");
const {ActionModuleType} = require("./base/ActionModuleType");

/**
 * 构建路由
 */
class BuildRoute {

    build(cb) {
        if (!ConfigUtil.config.actionPath) {
            console.error('no action path!');
            cb && cb([]);
            return;
        }
        // 获取所有module，并组装地址
        FileUtil.getFilesInDirectory(ConfigUtil.config.actionPath).then(modules => {
            const actions = {};
            for (let module of modules) {
                // 引入模块儿
                const path = module.replace("src", "..\\src");
                const req = require(path);
                for (let reqKey in req) {
                    // if ('BaseModule' === reqKey) continue;
                    const moduleInstance = req[reqKey];
                    if (moduleInstance.type && moduleInstance.type instanceof ActionModuleType) {
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
                    const route = k + '/' + method.replace('$$', '');
                    routes[route] = new ActionRoute(route, action, action[method]);
                }
            }

            cb && cb(routes);
        });
    }
}

exports.BuildRoute = new BuildRoute();

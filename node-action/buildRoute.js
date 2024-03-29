const {FileUtil} = require("./utils/FileUtil");
const {ModuleType} = require("./base/ModuleType");
const {ConfigUtil} = require("./utils/ConfigUtil");
const {ActionRoute} = require("./base/ActionRoute");
const {ActionModuleType} = require("./base/ActionModuleType");
const {GetMap} = require("./base/GetMap");
const {MapBase} = require("./base/MapBase");

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
            for (let actionName in actions) {
                const action = actions[actionName];
                let propertyNames = Object.getOwnPropertyNames(Object.getPrototypeOf(action));
                propertyNames = propertyNames.concat(Object.getOwnPropertyNames(action));
                const methodNames = propertyNames.filter(prop => action[prop] instanceof MapBase);
                for (let methodName of methodNames) {
                    const map = action[methodName];
                    if (map.path) {
                        const route = (actionName.toLowerCase() + '/' + map.path.toLowerCase()).replace(/\/\//g, "/");
                        routes[route] = new ActionRoute(route, action, map.handle).setMap(map);
                    } else {
                        const route = (actionName.toLowerCase() + '/' + methodName.toLowerCase()).replace(/\/\//g, "/");
                        routes[route] = new ActionRoute(route, action, map.handle).setMap(map);
                    }
                }
            }
            cb && cb(routes);
        });
    }
}

exports.BuildRoute = new BuildRoute();

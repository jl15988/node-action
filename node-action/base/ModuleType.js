const {ActionModuleType} = require("./ActionModuleType");

class ModuleType {
    action = new ActionModuleType('action');
    jsonAction = new ActionModuleType('jsonAction');
    textAction = new ActionModuleType('textAction');
}

exports.ModuleType = new ModuleType();

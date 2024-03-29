class ActionRoute {
    route;
    action;
    type;
    handle;
    map;

    constructor(route, action, handle) {
        this.route = route;
        this.action = action;
        this.type = action.type;
        this.handle = handle;
    }

    setMap(map) {
        this.map = map;
        return this;
    }
}

exports.ActionRoute = ActionRoute;

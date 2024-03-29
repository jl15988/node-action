class ActionRoute {
    route;
    action;
    type;
    method;

    constructor(route, action, method) {
        this.route = route;
        this.action = action;
        this.type = action.type;
        this.method = method;
    }
}

exports.ActionRoute = ActionRoute;

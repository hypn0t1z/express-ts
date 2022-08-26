"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteConfig = void 0;
class RouteConfig {
    constructor(app, name) {
        this.app = app;
        this.name = name;
        this.configureRoutes();
    }
    getName() {
        return this.name;
    }
}
exports.RouteConfig = RouteConfig;

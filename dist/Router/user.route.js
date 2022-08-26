"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const index_1 = require("./index");
const JWT_1 = __importDefault(require("../Service/Common/JWT"));
const user_controller_1 = __importDefault(require("../Controller/user.controller"));
class UserRoutes extends index_1.RouteConfig {
    constructor(app) {
        super(app, "UserRoutes");
    }
    configureRoutes() {
        this.app.route(`/user`).get([JWT_1.default.authenticateJWT, user_controller_1.default.getUser]);
        return this.app;
    }
}
exports.UserRoutes = UserRoutes;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const index_1 = require("./index");
const auth_controller_1 = __importDefault(require("../Controller/auth.controller"));
class AuthRoutes extends index_1.RouteConfig {
    constructor(app) {
        super(app, "AuthRoutes");
    }
    configureRoutes() {
        this.app.route("/api/login").post(auth_controller_1.default.login);
        this.app.route("/api/register").post(auth_controller_1.default.register);
        return this.app;
    }
}
exports.AuthRoutes = AuthRoutes;

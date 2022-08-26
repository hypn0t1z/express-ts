"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
dotenv_1.default.config({});
const user_route_1 = require("./Router/user.route");
const auth_route_1 = require("./Router/auth.route");
const s3_route_1 = require("./Router/s3.route");
const error_1 = require("./Config/error");
const app = (0, express_1.default)();
const routes = [];
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.static("public"));
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(undefined, {
    swaggerOptions: {
        url: "/swagger.json",
    },
}));
const PORT = process.env.PORT || 3001;
routes.push(new user_route_1.UserRoutes(app));
routes.push(new auth_route_1.AuthRoutes(app));
routes.push(new s3_route_1.S3Routes(app));
app.use((err, req, res, next) => {
    if (err instanceof error_1.FormError) {
        res.status(err.code)
            .json(err.errors);
    }
    else if (err instanceof error_1.HttpError) {
        res.status(err.code)
            .json({ error: err.message });
    }
    else if (!(0, error_1.isSystemError)(err)) {
        res.statusMessage = err.message;
        res.status(500)
            .json({ error: err.message });
    }
});
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    routes.forEach((route) => {
        console.log(`Routes configured for ${route.getName()}`);
    });
});

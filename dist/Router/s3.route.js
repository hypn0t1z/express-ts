"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Routes = void 0;
const index_1 = require("./index");
const s3_controller_1 = __importDefault(require("../Controller/s3.controller"));
const JWT_1 = __importDefault(require("../Service/Common/JWT"));
class S3Routes extends index_1.RouteConfig {
    constructor(app) {
        super(app, "S3Routes");
    }
    configureRoutes() {
        this.app.route("/api/s3/create-presigned-url").post([
            JWT_1.default.authenticateJWT,
            s3_controller_1.default.getPreSignedUrl
        ]);
        return this.app;
    }
}
exports.S3Routes = S3Routes;

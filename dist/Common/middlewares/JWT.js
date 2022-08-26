"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_KEY = process.env.JWT_SECRET || "123456";
const debug_1 = __importDefault(require("debug"));
const log = debug_1.default("middleware:JWT");
class JWT {
    authenticateJWT(req, res, next) {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader !== "null") {
            // const token = authHeader.split(" ")[1];
            log("auth Header", JWT_KEY);
            jsonwebtoken_1.default.verify(authHeader, JWT_KEY, (err, user) => {
                if (err) {
                    log("Error", err);
                    return res
                        .status(403)
                        .send({ success: false, message: "Token Expired" });
                }
                req.user = user;
                next();
            });
        }
        else {
            res.status(403).json({ success: false, message: "UnAuthorized" });
        }
    }
}
exports.default = new JWT();

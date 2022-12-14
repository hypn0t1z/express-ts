"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("../Service/auth.service"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const password_1 = require("../Service/Common/password");
const error_1 = require("../Config/error");
const jwtSecret = process.env.JWT_SECRET || "123456";
const tokenExpirationInSeconds = 36000;
class AuthController {
    constructor() { }
    /**
     * Login function
     * @param req
     * @param res
     * @param next
     */
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email;
                const password = req.body.password;
                const user = yield auth_service_1.default.findUserByEmail(email);
                if (user) {
                    const isPasswordMatch = yield password_1.Password.compare(user.password, password);
                    if (!isPasswordMatch) {
                        throw (0, error_1.badRequest)('login', error_1.FIELD_ERROR.INVALID, 'Invalid Password');
                    }
                    else {
                        const token = jsonwebtoken_1.default.sign(req.body, jwtSecret, {
                            expiresIn: tokenExpirationInSeconds,
                        });
                        return res.status(200).json({
                            data: Object.assign(Object.assign({}, user.toJSON()), { password: undefined }),
                            token,
                        });
                    }
                }
                else {
                    throw (0, error_1.badRequest)('login', error_1.FIELD_ERROR.USER_NOT_FOUND, 'User Not Found');
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    /**
     * Register function
     * @param req
     * @param res
     * @param next
     */
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email;
                const password = req.body.password;
                if (!email || !password) {
                    throw (0, error_1.badRequest)('register', error_1.FIELD_ERROR.INVALID, 'Email or password is required!');
                }
                const user = yield auth_service_1.default.findUserByEmail(email);
                if (user) {
                    throw (0, error_1.badRequest)('register', error_1.FIELD_ERROR.EXISTED, 'User Already Exists');
                }
                else {
                    try {
                        const psw = yield password_1.Password.toHash(password);
                        const newUser = yield auth_service_1.default.createUser(email, psw);
                        const token = jsonwebtoken_1.default.sign({ email, password }, jwtSecret, {
                            expiresIn: tokenExpirationInSeconds,
                        });
                        return res.status(201).json({
                            data: newUser,
                            token,
                        });
                    }
                    catch (e) {
                        console.log("Controller capturing error", e);
                        throw (0, error_1.badRequest)('register', error_1.FIELD_ERROR.INVALID, 'Error when register');
                    }
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = new AuthController();

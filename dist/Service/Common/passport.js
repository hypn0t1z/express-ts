"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = exports.passportJwt = exports.initPassport = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const JWTStrategy = passport_jwt_1.default.Strategy;
const ExtractJWT = passport_jwt_1.default.ExtractJwt;
const initPassport = (passport) => {
    console.log('sa');
    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    }, (jwtPayload, cb) => cb(null, jwtPayload)));
};
exports.initPassport = initPassport;
const passportJwt = () => {
    console.log('ok www');
    passport_1.default.authenticate('jwt', { session: false });
};
exports.passportJwt = passportJwt;
function isAuthenticated(req, res, next) {
    console.log('OK', req.headers);
    let token = req.headers.authorization;
    token = token.split(' ');
    token = token.length === 2 && token[0] === 'Bearer' ? token[1] : null;
    const decode = token.verify(token, process.env.JWT_SECRET);
    console.log({ decode });
    if (decode) {
        //  Return response with decode data
        return decode;
    }
    return res.status(401).json('NOT_AUTHENTICATE');
}
exports.isAuthenticated = isAuthenticated;
;

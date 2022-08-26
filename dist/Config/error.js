"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.badRequest = exports.FormError = exports.FieldError = exports.FIELD_ERROR = exports.HttpError = exports.isSystemError = exports.HTTP_ERROR = void 0;
const lodash_1 = __importDefault(require("lodash"));
exports.HTTP_ERROR = Object.freeze({
    ACCESS_DENIED: 403,
    NOT_FOUND: 404,
    TIME_OUT: 402,
    BAD_REQUEST: 400,
    NOT_AUTHENTICATE: 401,
    INTERNAL_SERVER_ERROR: 500
});
const SYSTEM_ERROR = Object.freeze([
    'EACCES', 'EPERM'
]);
function isSystemError(err) {
    return err && err.code && SYSTEM_ERROR.indexOf(err.code) >= 0;
}
exports.isSystemError = isSystemError;
class HttpError extends Error {
    constructor(code, message, info) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.code = code;
        this.info = info;
    }
}
exports.HttpError = HttpError;
exports.FIELD_ERROR = Object.freeze({
    INVALID: 'INVALID',
    REFERENCE_CODE_INVALID: 'REFERENCE_CODE_INVALID',
    EMAIL_NOT_ACTIVE: 'EMAIL_NOT_ACTIVE',
    EXISTED: 'EXISTED',
    SIGNED_URL_FAILED: 'SIGNED_URL_FAILED',
    UPLOAD_FAILED: 'UPLOAD_FAILED',
    USER_NOT_FOUND: 'USER_NOT_FOUND',
});
class FieldError {
    constructor(name, code, message) {
        this.name = name;
        this.code = code;
        this.message = message;
    }
}
exports.FieldError = FieldError;
class FormError extends HttpError {
    constructor(_errors) {
        super(exports.HTTP_ERROR.BAD_REQUEST, 'Bad request', '');
        this.errors = lodash_1.default.concat([], _errors);
    }
}
exports.FormError = FormError;
function badRequest(name, code, message) {
    return new FormError(new FieldError(name, code, message));
}
exports.badRequest = badRequest;

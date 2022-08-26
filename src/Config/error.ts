import array from "lodash";

export const HTTP_ERROR = Object.freeze({
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

export function isSystemError(err: any) {
  return err && err.code && SYSTEM_ERROR.indexOf(err.code) >= 0;
}

export class HttpError extends Error {
  code: any;
  info: any;

  constructor(code: any, message: string, info: any) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.code = code;
    this.info = info;
  }
}

export const FIELD_ERROR = Object.freeze({
  INVALID: 'INVALID',
  REFERENCE_CODE_INVALID: 'REFERENCE_CODE_INVALID',
  EMAIL_NOT_ACTIVE: 'EMAIL_NOT_ACTIVE',
  EXISTED: 'EXISTED',
  SIGNED_URL_FAILED: 'SIGNED_URL_FAILED',
  UPLOAD_FAILED: 'UPLOAD_FAILED',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
});

export class FieldError {
  name: string;
  code: any;
  message: string;
  constructor(name: string, code: string, message: string) {
    this.name = name;
    this.code = code;
    this.message = message;
  }
}

export class FormError extends HttpError {
  errors: any;
  constructor(_errors: FieldError) {
    super(HTTP_ERROR.BAD_REQUEST, 'Bad request', '');
    this.errors = array.concat([], _errors);
  }
}

export function badRequest(name: string, code: any, message: string) {
  return new FormError(new FieldError(name, code, message));
}


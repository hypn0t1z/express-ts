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
exports.s3Service = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const uuid_1 = require("uuid");
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    signatureVersion: 'v4',
    region: process.env.S3_REGION
});
const { S3_BUCKET, S3_ENDPOINT } = process.env;
const S3_FOLDER = 'file';
class S3Service {
    /**
     * getSignedUrl
     *
     * @param {String} bucket
     * @param {String} fileName
     * @param {String} realName
     * @param {String} contentType
     * @return {Promise}
     */
    getSignedUrl(fileName, contentType) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                if (!fileName) {
                    return resolve({
                        message: 'SIGNED_URL_FAILED',
                        code: 'file',
                        error: 'FILE_NAME_NOT_FOUND'
                    });
                }
                const type = fileName.split(".").pop();
                const location = `${S3_FOLDER}/${fileName.replace(/[^a-zA-Z]/g, "")}_${(0, uuid_1.v4)()}.${type}`;
                const params = {
                    Bucket: S3_BUCKET,
                    Key: location,
                    ContentType: contentType,
                    Expires: 120,
                    // ACL: 'public-read'
                    // ContentDisposition: `inline; filename=${encodeURIComponent(realName)}`
                };
                s3.getSignedUrl('putObject', params, (err, data) => {
                    if (err)
                        return resolve({
                            message: 'SIGNED_URL_FAILED',
                            code: 'file',
                            error: err
                        });
                    return resolve({
                        urlUpload: data,
                        urlEndpoint: `${S3_ENDPOINT}/${location}`
                    });
                });
            });
        });
    }
}
exports.s3Service = new S3Service();

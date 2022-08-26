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
Object.defineProperty(exports, "__esModule", { value: true });
const s3_service_1 = require("../Service/s3.service");
class S3Controller {
    constructor() { }
    getPreSignedUrl(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fileName, contentType } = req.body;
                const result = yield s3_service_1.s3Service.getSignedUrl(fileName, contentType);
                return res.status(200).json(result);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = new S3Controller();

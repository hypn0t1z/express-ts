import {NextFunction, Request, Response} from "express";
import {s3Service} from "../Service/s3.service";

class S3Controller {
    constructor() {}

    async getPreSignedUrl(req: Request, res: Response, next: NextFunction) {
        try {
            const { fileName , contentType } = req.body;
            const result = await s3Service.getSignedUrl(fileName, contentType);
            return res.status(200).json(result);
        } catch (e) {
            next(e);
        }
    }
}

export default new S3Controller();

import AWS from "aws-sdk";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    signatureVersion: 'v4',
    region: process.env.S3_REGION
});

const { S3_BUCKET } = process.env;
const S3_ENDPOINT = `https://${S3_BUCKET}.s3.ap-southeast-1.amazonaws.com`
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
    async getSignedUrl (fileName: string, contentType: string) {
        return new Promise((resolve) => {
            if (!fileName) {
                return resolve({
                    message: 'File name is required',
                    code: 'FILE_NAME_NOT_FOUND',
                    name: 'getSignedUrl'
                });
            }

            const type = fileName.split(".").pop();
            const location = `${S3_FOLDER}/${fileName.replace(/[^a-zA-Z]/g, "")}_${uuidv4()}.${type}`;
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
                        message: err,
                        code: 'SIGNED_URL_FAILED',
                        name: 'getSignedUrl'
                    });

                return resolve({
                    urlUpload: data,
                    urlEndpoint: `${S3_ENDPOINT}/${location}`
                });
            });
        });
    }
}

export const s3Service = new S3Service();

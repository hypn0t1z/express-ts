import { Application, Request, Response } from "express";
import { RouteConfig } from "./index";
import S3Controller from "../Controller/s3.controller";
import JWT from "../Service/Common/JWT";

export class S3Routes extends RouteConfig {
    constructor(app: Application) {
        super(app, "S3Routes");
    }

    configureRoutes() {
        this.app.route("/api/s3/create-presigned-url").post([
            JWT.authenticateJWT,
            S3Controller.getPreSignedUrl
        ]);

        return this.app;
    }
}

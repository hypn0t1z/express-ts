import { Application, Request, Response } from "express";
import { RouteConfig } from "./index";
import AuthController from "../Controller/auth.controller";

export class AuthRoutes extends RouteConfig {
  constructor(app: Application) {
    super(app, "AuthRoutes");
  }

  configureRoutes() {

    this.app.route("/api/login").post(AuthController.login);

    this.app.route("/api/register").post(AuthController.register);

    return this.app;
  }
}

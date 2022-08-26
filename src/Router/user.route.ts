import { RouteConfig } from "./index";
import express, { Application, Request, Response } from "express";
import JWT from "../Service/Common/JWT";
import UserController from "../Controller/user.controller";
export class UserRoutes extends RouteConfig {
  constructor(app: Application) {
    super(app, "UserRoutes");
  }

  configureRoutes() {
    this.app.route(`/user`).get([JWT.authenticateJWT, UserController.getUser]);

    return this.app;
  }
}

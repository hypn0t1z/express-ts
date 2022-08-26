import express, {Express, Application, Request, Response, NextFunction} from "express";
import * as http from "http";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";

dotenv.config({});

import { RouteConfig } from "./Router";
import { UserRoutes } from "./Router/user.route";
import { AuthRoutes } from "./Router/auth.route";

const app: Express = express();
const routes: Array<RouteConfig> = [];

import { IUser } from "./Model/User/user.interface";
import { S3Routes } from "./Router/s3.route";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      swaggerOptions: {
        url: "/swagger.json",
      },
    })
);

const PORT = process.env.PORT || 3001;

routes.push(new UserRoutes(app));
routes.push(new AuthRoutes(app));
routes.push(new S3Routes(app));

const server: http.Server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);

  routes.forEach((route: RouteConfig) => {
    console.log(`Routes configured for ${route.getName()}`);
  });
});

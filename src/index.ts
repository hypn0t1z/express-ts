import express, {Express, Application, Request, Response, NextFunction} from "express";
import * as http from "http";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";

dotenv.config({});

import { RouteConfig } from "./Router";
import { UserRoutes } from "./Router/user.route";
import { AuthRoutes } from "./Router/auth.route";
import { IUser } from "./Model/User/user.interface";
import { S3Routes } from "./Router/s3.route";
import { FormError, HttpError, isSystemError } from "./Config/error";

const app: Express = express();
const routes: Array<RouteConfig> = [];

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

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof FormError) {
        res.status(err.code)
            .json(err.errors);
    } else if (err instanceof HttpError) {
        res.status(err.code)
            .json({error: err.message});
    } else if (!isSystemError(err)) {
        res.statusMessage = err.message;
        res.status(500)
            .json({error: err.message});
    }
});

const server: http.Server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);

  routes.forEach((route: RouteConfig) => {
    console.log(`Routes configured for ${route.getName()}`);
  });
});

import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
const JWT_KEY = process.env.JWT_SECRET || "123456";
import debug, { IDebugger } from "debug";

const log: IDebugger = debug("middleware:JWT");

class JWT {
  authenticateJWT(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader !== "null") {
      const token = authHeader.split(" ")[1];

      jwt.verify(token, JWT_KEY, (err: any, user: any) => {
        if (err) {
          console.log("Error", err);
          return res
            .status(403)
            .send({ success: false, message: "Token Expired" });
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401).json({ success: false, message: "UnAuthorized" });
    }
  }
}

export default new JWT();

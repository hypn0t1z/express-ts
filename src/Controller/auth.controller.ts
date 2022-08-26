import { NextFunction, Request, Response } from "express";
import AuthService from "../Service/auth.service";
import jwt from "jsonwebtoken";
import { Password } from "../Service/Common/password";

const jwtSecret: string = process.env.JWT_SECRET || "123456";
const tokenExpirationInSeconds = 36000;

class AuthController {
  constructor() {}

  /**
   * Login function
   * @param req
   * @param res
   * @param next
   */
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const user = await AuthService.findUserByEmail(email);
      if (user) {
        const isPasswordMatch = await Password.compare(user.password, password);

        if (!isPasswordMatch) {
          throw new Error("Invalid Password");
        } else {
          const token = jwt.sign(req.body, jwtSecret, {
            expiresIn: tokenExpirationInSeconds,
          });

          return res.status(200).json({
            success: true,
            data: {...user.toJSON(), password: undefined},
            token,
          });
        }
      } else {
        console.log("User Not Found");
        throw new Error("User Not Found");
      }
    } catch (e) {
      next(e);
    }
  }

  /**
   * Register function
   * @param req
   * @param res
   * @param next
   */
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const user = await AuthService.findUserByEmail(email);

      if (user) {
        throw new Error("User Already Exists");
      } else {
        try {
          const psw = await Password.toHash(password);
          const newUser = await AuthService.createUser(email, psw);

          const token = jwt.sign({ email, password }, jwtSecret, {
            expiresIn: tokenExpirationInSeconds,
          });

          return res.status(200).json({
            success: true,
            data: newUser,
            token,
          });
        } catch (e) {
          console.log("Controller capturing error", e);
          throw new Error("Error while register");
        }
      }
    } catch (e) {
      next(e);
    }
  }
}

export default new AuthController();

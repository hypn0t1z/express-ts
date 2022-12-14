import { Request, Response, NextFunction } from "express";
import UserService from "../Service/user.service";

class UserController {
  constructor() {}

  async getUser(req: any, res: Response, next: NextFunction) {
    const email = req.user.email;
    try {
      const user = await UserService.findUserByEmail(email);

      return res.status(200).json({
        data: user,
      });
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();

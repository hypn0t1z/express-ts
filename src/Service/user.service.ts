import User from "../Model/User/user.model";

class UserService {
  async findUserByEmail(email: string) {
    return User.findOne({
      where: { email },
    });
  }
}

export default new UserService();

import User from "../Model/User/user.model";

class AuthService {
  async createUser(email: string, password: string) {
    try {
      const user = await User.create({
        email,
        password
      });
      return user;
    } catch (e) {
      throw new Error(`Error create user: ${e}`);
    }
  }

  async findUserByEmail(email: string, hiddenPassword: boolean = false) {
    return User.findOne({
      where: {
        email
      }
    });
  }
}

export default new AuthService();

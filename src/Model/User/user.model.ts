import { Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize('mysql://root:123123123@localhost:3306/mydb');

class User extends Model {
  declare id: number;
  declare email: string;
  declare password: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: new DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: new DataTypes.STRING,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: 'users',
      sequelize,
      timestamps: true
    },
);

// async function doStuffWithUserModel() {
//   const newUser = await User.create({
//     name: 'Johnny',
//     preferredName: 'John',
//   });
//   console.log(newUser.id, newUser.name, newUser.preferredName);
//
//   const foundUser = await User.findOne({ where: { name: 'Johnny' } });
//   if (foundUser === null) return;
//   console.log(foundUser.name);
// }



export default User;

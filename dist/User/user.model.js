"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('mysql://root:123123123@localhost:3306/mydb');
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: new sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: new sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    tableName: 'users',
    sequelize,
    timestamps: true
});
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
exports.default = User;

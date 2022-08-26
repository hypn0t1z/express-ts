"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const databaseConfig = require('../../Config/database');
const env = process.env.NODE_ENV || 'development';
const config = Object.assign({}, databaseConfig[env]);
const sequelize = new sequelize_1.default(config.database, config.username, config.password, config);
const models = Object.assign(Object.assign(Object.assign(Object.assign({}, aclModels(sequelize)), { 
    // Wallet
    Wallet: Wallet.init(sequelize), SystemWallet: SystemWallet.init(sequelize) }), nftModels(sequelize)), { 
    // Group box
    GroupBox: GroupBox.init(sequelize), Box: Box.init(sequelize), 
    // Setting
    Setting: Setting.init(sequelize) });
Object.values(models)
    .filter(model => typeof model.associate === 'function')
    .forEach(model => model.associate(models));
models.sequelize = sequelize;
models.Sequelize = sequelize_1.default;
exports.default = models;

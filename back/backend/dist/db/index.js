"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDB = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const ToDo_model_1 = __importDefault(require("./models/ToDo.model"));
//Создаем instance Sequelize
const sequelizeInstance = new sequelize_typescript_1.Sequelize({
    dialect: "postgres",
    port: 5432,
    database: "postgres",
    username: "postgres",
    password: "123",
    models: [ToDo_model_1.default]
});
const initDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelizeInstance.authenticate(); //Авторизация нашей ORM в БД
        // await sequelize.dropSchema('public', {});
        // await sequelize.createSchema('public', {});
        yield sequelizeInstance.sync(); //Синхронизация МОДЕЛЕЙ
        console.log("Sequelize was initialized");
    }
    catch (error) {
        console.log("Sequelize ERROR (initDB)", error);
        process.exit();
    }
});
exports.initDB = initDB;

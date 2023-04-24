import { Sequelize } from 'sequelize-typescript';
import ToDo from './models/ToDo.model';

//Создаем instance Sequelize
const sequelizeInstance = new Sequelize({
  dialect: "postgres",
  port: 5432,
  database: "postgres",
  username: "postgres",
  password: "123",
  models: [ToDo]
});

export const initDB = async () => {
  try {
    await sequelizeInstance.authenticate(); //Авторизация нашей ORM в БД
    // await sequelize.dropSchema('public', {});
    // await sequelize.createSchema('public', {});
    await sequelizeInstance.sync(); //Синхронизация МОДЕЛЕЙ
    console.log("Sequelize was initialized");
  } catch (error) {
    console.log("Sequelize ERROR (initDB)", error);
    process.exit();
  }
};

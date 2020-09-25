import {Sequelize} from 'sequelize-typescript';

export const sequelize = new Sequelize('node_sequelize', 'postgres', 'password21', {
  host: 'localhost',
  dialect: 'postgres',
  models: [__dirname + '/models']
})
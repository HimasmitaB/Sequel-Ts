import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import * as bodyParser from 'body-parser';
//import * as errorhandler from 'strong-error-handler';
import {projectrouter} from './routes/projects';
import {userrouter} from './routes/users';
import {loginroute} from './routes/login';
import {sequelize} from './sequelize';
import {Users} from './models/Users';
import {Projects} from './models/Projects';

export const app = express();

// middleware for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// middleware for json body parsing
app.use(bodyParser.json({limit: '5mb'}));

// enable corse for all origins
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Expose-Headers", "x-total-count");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type,authorization");

  next();
});

app.use('/projects', projectrouter);
app.use('/users', userrouter);
app.use('/login', loginroute);
// app.use(errorhandler({
//   debug: app.get('env') !== 'prod',
//   log: true,
// }));

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
          message: err.message, 
          error: err
      });
      next();
   });
}

sequelize.addModels([Users, Projects]);
export default app;
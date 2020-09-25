import {createServer} from 'http';
import {app} from './app';
import {sequelize} from './sequelize';
import { port } from "./config/config";

//const port = process.env.PORT || 3000;

(async () => {
  await sequelize.sync({force: true});

  createServer(app)
    .listen(
      port,
      () => console.info(`Server running on port ${port}`)
    );
})();

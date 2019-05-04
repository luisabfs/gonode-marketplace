const express = require('express');
const routes = require('./routes');

class App {
  constructor() {
    this.express = express();
    this.isDev = process.env.NODE_ENV !== 'production';

    this.middleware();
    this.routes();
  }

  middlewares() {
    this.express.user(express.json());
  }

  routes() {
    this.express.user(routes);
  }
}

module.exports = new App().express;

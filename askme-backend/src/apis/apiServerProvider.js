const express = require('express');

const config = require('./api.config');

/**
 * Provider for API's express instace
 */
class ApiServerProvider {
  /**
   * Inits the express instance and add the configured apis
   */
  static initApis() {
    this._app.use(express.json());
    config.apis.forEach(({name, base, router}) => {
      console.log(`Adding api: ${name}...`);
      this._app.use(base, router);
      console.log(`Added api: ${name}`);
    });
  }

  /**
   * Returns the current express instance
   * @return {express} express instance
   */
  static getRequiredExpressServerInstance() {
    return this._app;
  }

  /**
   * Starts the current express instance according to the configured port
   */
  static startServer() {
    console.log(`Starting server at port ${config.port}...`);
    this._app.listen(config.port, () => {
      console.log(`Server up and running at port ${config.port}`);
    });
  }
}

ApiServerProvider._app = express();

module.exports = ApiServerProvider;

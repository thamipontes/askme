const express = require('express');
const cors = require('cors');

const config = require('./api.config');
const apiResponse = require('./apiResponse');
const ServiceException = require('../services/serviceException');
const ValidationException = require('../services/validationException');

/**
 * Provider for API's express instace
 */
class ApiServerProvider {
  /**
   * Inits the express instance and add the configured apis
   */
  static initApis() {
    this._app.use(express.json());
    this._app.use(cors());
    this._app.use((req, res, next) => {
      console.log(
          `{API} ${new Date().toUTCString()}\t| ${req.method}\t| ${req.url}`,
      );
      next();
    });

    config.apis.forEach(({name, base, router}) => {
      console.log(`Adding api: ${name}...`);
      this._app.use(base, router);
      console.log(`Added api: ${name}`);
    });


    this._app.use((err, req, res, next) => {
      if (err instanceof ServiceException) {
        res.status(422); // Unprocessable Entity
        res.send(apiResponse(false, err.message, err.data));
      } else if (err instanceof ValidationException) {
        res.status(400); // Unprocessable Entity
        res.send(apiResponse(false,
          err.message != ''? err.message : 'Erro de validação', null),
        );
      } else {
        const exceptionCode = Math.floor(Math.random()*4096).toString(16);
        console.log(`{API} Exception ${exceptionCode}: ${err}`);
        res.status(500);
        res.send(apiResponse(false,
            'Ocorreu um erro ao tentar processar a requisição', {
              exceptionCode,
            }));
      }
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

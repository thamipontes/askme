const express = require('express');

const config = require('./api.config');

class ApiServerProvider {
    static _app = express();

    static initApis() {
        config.apis.forEach(({name, base, router}) => {
            console.log(`Adding api: ${name}...`);
            this._app.use(base, router);
            console.log(`Added api: ${name}`);
        });
    }

    static getRequiredExpressServerInstance() {
        return this._app;
    }

    static startServer() {
        console.log(`Starting server at port ${config.port}...`);
        this._app.listen(config.port, () => {
            console.log(`Server up and running at port ${config.port}`);
        });
    }
}

module.exports = ApiServerProvider;
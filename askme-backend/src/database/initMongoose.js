const mongoose = require('mongoose');

// Change to mongoose.config when using in production
const config = require('./mongooseDev.config');

class MongooseProvider {
    static _mongooseInstance = null;
    static connected = false;
    static error = null;
    static listeners = [];
    
    static initMongooseInstance() {
        mongoose.connect(config.connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
        this._mongooseInstance = mongoose;

        var db = mongoose.connection;

        db.on('error', _ => {
            this.connected = false;
            this.error = MongooseProviderException(MongooseProviderExceptionTypes.FailedToConnect);

            this.listeners.filter(({name}) => name=="failed").forEach(({callback}) => callback.apply(this))
        });

        db.once('open', _ => {
            this.connected = true;

            this.listeners.filter(({name}) => name=="connected").forEach(({callback}) => callback.apply(this))
        });

        return true;
    }

    static whenFailed(callback) {
        this.listeners.push({
            name: "failed",
            callback: callback,
        });

        if(!this.connected && this.error) {
            this.listeners.filter(({name}) => name=="failed").forEach(({callback}) => callback.apply(this));
        }
    }

    static whenConnected(callback) {
        this.listeners.push({
            name: "connected",
            callback: callback,
        });

        if(this.connected && !this.error) {
            this.listeners.filter(({name}) => name=="connected").forEach(({callback}) => callback.apply(this));
        }
    }
    
    static getRequiredMongooseInstance() {
        if(this._mongooseInstance === null) {
            throw MongooseProviderException(MongooseProviderExceptionTypes.NotInited);
        }

        return this._mongooseInstance;
    }
};

const MongooseProviderExceptionTypes = {
    NotInited: "MongooseProvider was not inited yet",
    FailedToConnect: "MongooseProvider failed to connect to the database",
};

function MongooseProviderException(message) {
    var error = new Error();
    error.name = "MongooseProviderError";
    error.message = message;
    return error;
};

module.exports = {
    MongooseProviderException,
    MongooseProviderExceptionTypes,
    MongooseProvider,
};
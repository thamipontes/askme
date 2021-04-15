const mongoose = require('mongoose');

// Change to mongoose.config when using in production
const config = require('./mongooseDev.config');

/**
 * Provider for the mongoose instance
 */
class MongooseProvider {
  /**
   * Inits the mongoose instance and connects it
   */
  static initMongooseInstance() {
    mongoose.connect(config.connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this._mongooseInstance = mongoose;

    const db = mongoose.connection;

    db.on('error', () => {
      this.connected = false;
      this.error = mongooseProviderException(
          MongooseProviderExceptionTypes.FailedToConnect);

      this.listeners.filter(({
        name,
      }) => name == 'failed').forEach(({
        callback,
      }) => callback.apply(this));
    });

    db.once('open', () => {
      this.connected = true;

      this.listeners.filter(({
        name,
      }) => name == 'connected').forEach(({
        callback,
      }) => callback.apply(this));
    });
  }

  /**
   * Triggers the given callback if and when the initialization fails
   * @param {*} callback
   */
  static whenFailed(callback) {
    this.listeners.push({
      name: 'failed',
      callback: callback,
    });

    if (!this.connected && this.error) {
      this.listeners.filter(({
        name,
      }) => name == 'failed').forEach(({
        callback,
      }) => callback.apply(this));
    }
  }

  /**
   * Triggers the given callback if and when the initialization finishes
   * @param {*} callback
   */
  static whenConnected(callback) {
    this.listeners.push({
      name: 'connected',
      callback: callback,
    });

    if (this.connected && !this.error) {
      this.listeners.filter(({
        name,
      }) => name == 'connected').forEach(({
        callback,
      }) => callback.apply(this));
    }
  }

  /**
   * Returns the current mongoose instance
   * @return {mongoose} Mongoose instance
   */
  static getRequiredMongooseInstance() {
    if (this._mongooseInstance === null) {
      throw mongooseProviderException(MongooseProviderExceptionTypes.NotInited);
    }

    return this._mongooseInstance;
  }
};

const MongooseProviderExceptionTypes = {
  NotInited: 'MongooseProvider was not inited yet',
  FailedToConnect: 'MongooseProvider failed to connect to the database',
};

/**
 * Returns a proper error for MongooseProvider
 * @param {string} message
 * @return {Error} Filled error
 */
function mongooseProviderException(message) {
  const error = new Error();
  error.name = 'MongooseProviderError';
  error.message = message;
  return error;
};

MongooseProvider._mongooseInstance = null;
MongooseProvider.connected = false;
MongooseProvider.error = null;
MongooseProvider.listeners = [];

module.exports = {
  mongooseProviderException,
  MongooseProviderExceptionTypes,
  MongooseProvider,
};

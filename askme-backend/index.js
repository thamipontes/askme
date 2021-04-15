const {MongooseProvider} = require('./src/database/mongooseProvider');
const initAllRepositories = require('./src/repositories/initRepositories');
const ApiServerProvider = require('./src/apis/apiServerProvider');

/**
 * Sequência de inicialização automatizada do backend
 */
class StartupChain {
  /**
   * Inicia a startup chain
   */
  static start() {
    this.started = true;
    this.initMongoose();
  }

  /**
   * Inicia o MongooseProvider
   */
  static initMongoose() {
    MongooseProvider.initMongooseInstance();
    MongooseProvider.whenFailed(() => {
      console.log('MongoDB failed to connected!');
    });

    MongooseProvider.whenConnected(() => {
      console.log('MongoDB connected successfully!');
      this.initRepositories();
    });
  }

  /**
   * Inicia os Repositórios
   */
  static initRepositories() {
    console.log('Initing repositories...');
    initAllRepositories(MongooseProvider.getRequiredMongooseInstance());
    this.initApis();
  }

  /**
   * Inicia as Apis
   */
  static initApis() {
    ApiServerProvider.initApis();
    ApiServerProvider.startServer();
    this.complete();
  }

  /**
   * Conclui a sequência de inicialização e invoca callbacks
   */
  static complete() {
    this.completed = true;
    this.listeners.filter(({name}) => name=='completed').forEach(
        ({callback}) => callback.apply(this),
    );
  }

  /**
   * Invoca o callback dado quando a sequência de inicialização é finalizada
   * @param {*} callback
   */
  static whenCompleted(callback) {
    this.listeners.push({
      name: 'completed',
      callback: callback,
    });

    if (this.completed) {
      this.listeners.filter(({name})=> name=='completed').forEach(
          ({callback}) => callback.apply(this),
      );
    }
  }
}

StartupChain.started = false;
StartupChain.completed = false;
StartupChain.listeners = [];

StartupChain.start();

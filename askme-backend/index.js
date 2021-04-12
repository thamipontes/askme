const {MongooseProvider} = require('./src/database/mongooseProvider');
const {initAllRepositories} = require('./src/repositories/initRepositories');
const ApiServerProvider = require('./src/apis/apiServerProvider');
const {UserRepository} = require('./src/repositories/userRepository');
const {User} = require('./src/entities/user');

class StartupChain {
    static started = false;
    static completed = false;
    static listeners = [];

    static start() {
        this.started = true;
        this.initMongoose();
    }

    static initMongoose() {
        MongooseProvider.initMongooseInstance()
        MongooseProvider.whenFailed(_ => {
            console.log("MongoDB failed to connected!");
        });

        MongooseProvider.whenConnected(_ => {
            console.log("MongoDB connected successfully!");
            this.initRepositories();
        });
    }
    
    static initRepositories() {
        console.log("Initing repositories...")
        initAllRepositories(MongooseProvider.getRequiredMongooseInstance());
        this.initApis();
    }

    static initApis() {
        ApiServerProvider.initApis();
        ApiServerProvider.startServer();
        this.complete();
    }
    
    static complete() {
        this.completed = true;
        this.listeners.filter(({name})=> name=="completed").forEach(({callback}) => callback.apply(this));
    }

    static whenCompleted(callback) {
        this.listeners.push({
            name: "completed",
            callback: callback,
        })

        if(this.completed) {
            this.listeners.filter(({name})=> name=="completed").forEach(({callback}) => callback.apply(this));
        }
    }
}

StartupChain.start();
StartupChain.whenCompleted(_ => {
    console.log("Saving...");
    var user = new User("Tito", "tito_");
    UserRepository.save(user);
    console.log("Saved");
});
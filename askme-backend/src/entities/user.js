class User {
    constructor(name, password) {
        this.name = name;
        this.password = password;
    }

    setId(id) {
        this.id = id;
    }

    static getSchema() {
        return {
            name: String,
            password: String,
        }
    }

    toObject() {
        return {
            name: this.name, 
            password: this.password,
        }
    }
}

module.exports = { User };
class User {
    static nameMinLength = 3;
    static nameMaxLength = 20;
    static passwordMinLength = 8;
    static passwordMaxLength = 20;

    static getSchema() {
        return {
            name: String,
            password: String,
        }
    }

    /**
     * Represents a User
     * @constructor
     * @param {String} name 
     * @param {String} password 
     */
    constructor(name, password) {
        this.name = name;
        this.password = password;
    }

    setId(id) {
        this.id = id;
    }

    /**
     * Converts the user's properties to a object
     * @returns {Object}
     */
    toObject() {
        return {
            id: this.id,
            name: this.name, 
            password: this.password,
        }
    }

    /**
     * Validates the user's properties and returns the result
     * @returns {boolean}
     */
    isValid() {
        if(this.name.length > User.nameMaxLength || this.name.length < User.nameMinLength) {
            return false;
        }

        if(this.password.length > User.passwordMaxLength || this.password.length < User.passwordMinLength) {
            return false;
        }

        return true;
    }
}

module.exports = User;
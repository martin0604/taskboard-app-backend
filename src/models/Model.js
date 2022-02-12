const connections = require('../../database/config');

class Model {

    constructor() {
        this.connection = connections.POSTGRESQL();
    }

    async connect () {
        await this.connection.connect();
    }

    async endConnection() {
        await this.connection.end();
    }

    async executeQuery (sql, params = []) {
        await this.connect();
        await this.connection.query(`SET search_path TO 'jagtodo'`);
        let results = await this.connection.query(sql, params);
        await this.endConnection();
        return results;
    }
}

module.exports = Model;
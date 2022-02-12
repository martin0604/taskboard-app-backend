const Model = require('./Model');
const modelUtils = require('../utils/models-utilities');

class User extends Model {

    //Get all users
     async select(...columns) {
        let sql = format(`SELECT ${modelUtils.generateColumnIdentifiers(columns)} FROM system_user`, ...columns);
        let results = await this.executeQuery(sql);
        return results;
    }

    //Get specific user
    async getByUsername(user_name) {
        let results =  await this.executeQuery(`SELECT * FROM system_user WHERE username = $1`, [user_name]);
        return results;
    }

    //Get user by id
    async getById(user_id) {
        let result = await this.executeQuery(`SELECT * FROM system_user WHERE id = $1`, [user_id]);
        return result;
    }

    //Create new user
    async create(user) {
        let results = await this.executeQuery(`INSERT INTO system_user VALUES(DEFAULT, $1, $2, $3, $4)`,[user.firstname, user.lastname, user.username, user.password]);
        return results;
    }

    //Update an user's data
    async update(user_id, first_name, last_name){
        let result = await this.executeQuery(`UPDATE system_user SET first_name = $1, last_name = $2 WHERE id = $3`, [first_name, last_name, user_id]);
        return result;
    }

    //Update an user's password
    async updatePassword(user_id, new_password) {
        let result = await this.executeQuery(`UPDATE system_user SET password = $1 WHERE id = $2`,[new_password, user_id]);
        return result;
    }

    //Delete a user
    async delete(user_id) {
        let result = await this.executeQuery(`DELETE FROM system_user WHERE id = $1`, [user_id]);
        return result;
    }
}

module.exports = User;
const Model = require('./Model');
const modelUtils = require('../utils/models-utilities');
const format = require('pg-format');

class Project extends Model {
    
    //Get all projects
    async select(...columns) {
        let sql = format(`SELECT ${modelUtils.generateColumnIdentifiers(columns)} FROM project`, ...columns);
        let results = await this.executeQuery(sql);
        return results;
    }

    //Get user's projects
    async selectUserProjects(user_id) {
        let result = await this.executeQuery(`SELECT * FROM project WHERE user_id = $1`, [user_id]);
        return result;
    }

    //Get project
    async getById(project_id) {
        let result = await this.executeQuery(`SELECT * FROM project WHERE id = $1`,[project_id]);
        return result;
    }

    //Create project
    async create(user_id, name, description) {
        let result = await this.executeQuery(`INSERT INTO project VALUES(DEFAULT, $1, $2, $3)`,[user_id, name, description]);
        return result;
    }

    //Update project
    async update(project_id, user_id, name, description) {
        let result = await this.executeQuery(`UPDATE project SET user_id = $1, name = $2, description = $3 WHERE id = $4`,[project_id, user_id, name, description]);
        return result;
    }

    //Delete project
    async delete(project_id){
        let result = await this.executeQuery(`DELETE FROM project WHERE id = $1`,[project_id]);
        return result;
    }
}

module.exports = Project;
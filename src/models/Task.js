const Model = require('./Model');
const modelUtils = require('../utils/models-utilities');
const format = require('pg-format');

class Task extends Model {

    //Get all tasks with given columns
    async select(...columns) {
        let sql = format(`SELECT ${modelUtils.generateColumnIdentifiers(columns)} FROM task`, ...columns);
        let results = await this.executeQuery(sql);
        return results;
    }

    //Get one task
    async getById(task_id) {
        let results = await this.executeQuery(`SELECT * FROM task WHERE id = $1`, [task_id]);
        return results;
    }

    //Create task
    async create(proyect_id, description, start_date, status) {
        let result = await this.executeQuery(`INSERT INTO task(id, proyect_id, description, start_date, status) VALUES(DEFAULT, $1, $2, $3, $4)`,[proyect_id, description, start_date, status]);
        return result;
    }

    //Get tasks associated with a project
    async getProjectTasks (project_id) {
        let results = await this.executeQuery(`SELECT * FROM task WHERE project_id = $1`, [project_id]);
        return results;
    }

    //Update a task's description, start date, end date and status
    async update(task_id, description, start_date, end_date, status) {
        let result = await this.executeQuery(`UPDATE task SET description = $1, start_date = $2, end_date = $3, status = $4 WHERE id = $5`,[description, start_date, end_date, status, task_id]);
        return result;
    }

    //Delete task
    async delete(task_id) {
        let result = await this.executeQuery(`DELETE FROM task WHERE id = $1`,[task_id]);
        return result;
    }

};

module.exports = Task;
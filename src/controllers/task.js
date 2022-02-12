const tasksRouter = require('express').Router();
const Task = require('../models/Task');

//Get all tasks
tasksRouter.get('/', async (req, res) => {
    try {
        const taskModel = new Task();
        const tasks = await taskModel.select();
        res.status(200).json({msg:'Tasks retrieved successfully', tasks});
    } catch (error) {
        res.status(409).json({msg:'Error while retrieving tasks', error: error.message});
    }
});

//Get one task
tasksRouter.get('/:id', async (req, res) => {
    try {
        const {task_id} = req.params;
        const taskModel = new Task();
        const task = await taskModel.getById(task_id);
        res.status(200).json({msg:'Task retrieved successfully', task});
    }catch(error){
        res.status(409).json({msg:`Error while retrieving task with id ${req.params.id}`,error: error.message});
    }
});

//Create a task
tasksRouter.post('/', async (req, res) => {
    try {
        const {project_id, description, start_date, status} = req.body;
        const taskModel = new Task();
        const createdTask = await taskModel.create(project_id, description, start_date, status);
        res.status(200).json({msg:'Task created succesfully', createdTask});
    } catch (error){
        res.status(409).json({msg:'Error while trying to create a task', error});
    }
});

//Update task
tasksRouter.patch('/:id', async (req, res) => {
    try{
        const {task_id} = req.params;
        const {new_description, new_start_date, new_end_date, new_status} = req.body; 
        const taskModel = new Task();
        const task = await taskModel.update(task_id, new_description, new_start_date, new_end_date, new_status);
        res.status(200).json({msg:'Task updated succesfully', task: task});
    } catch (error) {
        res.status(409).json({msg:'An error has ocurred while trying to update a task'});
    }
});

//Delete task
tasksRouter.delete('/:id', async (req, res) => {
    try {
        const {task_id} = req.params;
        const taskModel = new Task();
        const taskDeleted = await taskModel.delete(task_id);
        res.status(200).json({msg: `Task with id ${task_id} deleted successfully`});
    } catch (error) {
        res.status(409).json({msg: `Error while trying to delete task with id ${task_id}`, error: error.message});
    }
});

module.exports = tasksRouter;
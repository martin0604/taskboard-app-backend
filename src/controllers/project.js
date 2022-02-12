const Project = require('../models/Project');
const projectRouter = require('express').Router();


//Create project
projectRouter.post('/', async (req, res) => {
    try {
        const {user_id, name, description} = req.body;
        const projectModel = new Project();
        const createdProject = await projectModel.create(user_id, name, description);
        res.status(200).json({msg:'Project created successfully', createdProject});
    } catch (error) {
        res.status(409).json({msg:'Error while trying to create a new project.', error: error.message});
    }
});

//Update project
projectRouter.patch('/:id', async (req, res) => {
    try {
        const project_id = req.params.id;
        const {name, description} = req.body;
        const projectModel = new Project();
        const updatedProject = await projectModel.update(project_id, name, description);
        res.status(200).json({msg:'Task updated successfully', project: updatedProject});
    } catch (error) {
        res.status(409).json({msg:'Error while trying to update', error: error.message});
    }
});

//Get project
projectRouter.get('/:id', async (req, res) => {
    try {
        const project_id = req.params.id;
        const projectModel = new Project();
        const project = await projectModel.getById(project_id);
        res.status(200).json({msg:'Project retrieved successfully', project});
    } catch (error) {
        res.status(409).json({msg:`Error while retrieving project with id ${project_id}`, error: error.message});
    }
});

//Delete project
projectRouter.delete('/:id', async (req, res) => {
    try {
        const project_id = req.params.id;
        const projectModel = new Project();
        const projectDeleted = await projectModel.delete(project_id);
        res.status(200).json({msg:`Project deleted successfully`});
    } catch (error) {
        res.status(409).json({msg:`Could not delete project with id ${project_id}.`, error: error.message});
    }
});

module.exports = projectRouter;
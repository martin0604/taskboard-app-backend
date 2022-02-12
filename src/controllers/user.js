const userRouter = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const Project = require('../models/Project');

//Get all users
userRouter.get('/', async (req, res) => {
    try {
        const userModel = new User();
        const users = await userModel.select()
        res.status(200).json({msg:'Users retrieved successfully', users})
    } catch (error) {
        res.status(409).json({msg:'Error while trying to retrieve users', error: error.message});
    }
});

//Get user by id
userRouter.get('/:id', async (req, res) => {
    try {
        const user_id = req.params.id;
        const userModel = new User();
        const user = await userModel.getById(user_id);
        res.status(200).json({msg:'User retrieved successfully', user});
    } catch (error) {
        res.status(409).json({msg:`Could not retrieve user data with id ${id}.`, error: error.message});
    }
});

//Create a new user
userRouter.post('/', async (req, res) => {
    try {
        const {username, password, firstname, lastname} = req.body;
        const userModel = new User();
        if(!username || !password || !firstname || !lastname){
            res.status(400).send('Bad request, please provide all the necessary data.');
        } else {
            if(password.length < 3){
                res.status(409).send('Conflict. Password must be at least three characters long');
            } else{
                const saltRounds = 10;
                const passwordHash = await bcrypt.hash(password, saltRounds);
                const user = {
                    username,
                    password: passwordHash,
                    firstname,
                    lastname
                };

                userModel.create(user);
                res.status(200).json({msg: 'User created successfully.'});
            }
        }
    } catch (error) {
        res.status(409).send('Conflict. User creation was unsuccessful');
    }
});

//Get user projects
userRouter.get('/user/:id/projects', async (req, res) => {
    try {
        const {user_id} = req.params.id;
        const projectModel = new Project();
        const userProjects = await projectModel.selectUserProjects(user_id);
        res.status(200).json({msg:'User projects retrieved successfully', userProjects});
    } catch (error) {
        res.status(409).json({msg:`Error while retrieving an user's projects. The user's id is ${user_id}`, error: error.message});
    }
});

//Update a user
userRouter.patch('/user/:id', async (req, res) => {
    try {
        const user_id = req.params.id;
        const {first_name, last_name} = req.body;
        const userModel = new User();
        const user = await userModel.update(user_id, first_name, last_name);
        res.status(200).json({msg: `User with id ${user_id} updated`});
    } catch (error){
        res.status(409).json({msg:`Error while updating user with id ${user_id}.`, error: error.message});
    }
});

//Delete a user
userRouter.delete('/user/:id', async (req, res) => {
    try {
        const user_id = req.params.id;
        const userModel = new User();
        const userDeleted = await userModel.delete(user_id);
        res.status(200).json({msg: `User with id ${user_id} deleted successfully`});
    } catch (error) {
        res.status(409).json({msg: `Error while trying to delete user with id ${user_id}.`, error: error.message});
    }
})

module.exports = userRouter;
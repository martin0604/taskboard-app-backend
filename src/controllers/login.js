const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

//Login handler
loginRouter.post('/', async (req, res) => {
    //Get username and password from request body
    const {username, password} = req.body;
    const UserModel = new User();
    const user = await UserModel.getByUsername(username);
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.password);

    if(!(user && passwordCorrect)) {
        return res.status(401).json({msg: 'Invalid username or password'});
    }

    res.status(200).json({msg: 'Sign in successful'});
});

module.exports = loginRouter;
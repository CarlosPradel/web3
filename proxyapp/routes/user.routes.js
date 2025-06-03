module.exports = (app) => {
    let router = require('express').Router();
    const userController = require('../controllers/user.controller');
    router.post('/login', userController.login);
    router.post('/refresh', userController.refreshToken);
    app.use('/auth', router);
}
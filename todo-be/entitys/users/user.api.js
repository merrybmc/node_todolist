const express = require('express');
const userController = require('./controller/user.controller');
const authController = require('../auth/auth.repository');
const intercepter = require('../../common/exception/http-exception.filter');
const userService = require('./service/user.service');
const router = express.Router();

router.post('/', authController.validEmail, userService.createUser, intercepter);

router.post('/login', userController.loginWithEmail, userService.loginWithEmail, intercepter);

router.get('/valid', userController.validToken);

router.get('/logout', userController.logOut);

router.get('/me', authController.authenticate, userController.getUser);

module.exports = router;

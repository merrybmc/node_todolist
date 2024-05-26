const express = require('express');
const userController = require('./controller/user.controller');
const authController = require('../auth/auth.repository');
const intercepter = require('../../common/exception/http-exception.filter');
const userService = require('./service/user.service');
const router = express.Router();

// 회원가입
router.post('/', authController.validEmail, userService.createUser, intercepter);

// 로그인
router.post('/login', userController.loginWithEmail, userService.loginWithEmail, intercepter);

// 로그아웃
router.get('/logout', userController.logout, userService.logout, intercepter);

// 유저 정보 조회
router.get(
  '/me',
  authController.authenticate,
  userController.getUser,
  userService.getUser,
  intercepter
);

// CSRF 토큰 획득
router.get('/getCsrfToken', authController.createCsrfToken);

module.exports = router;

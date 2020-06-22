const express = require('express');

const UsersService = require('../services/users.service')

const router = express.Router();

router.post("/signup", UsersService.createUser);

router.post("/login", UsersService.userLogin);

module.exports = router;
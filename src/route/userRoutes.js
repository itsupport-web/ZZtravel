const express = require('express');
const router = express.Router();
require("dotenv").config();
const middleware = require("../middleware/session.js");

const UserController = require('../controller/userController.js');

router.post("/check", UserController.loginUser);

router.post("/admin",middleware.ensureLoggedIn, UserController.sendAdmin);
module.exports = router;

































































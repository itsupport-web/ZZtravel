const express = require('express');
const router = express.Router();

const middleware = require("../middleware/session.js");

const UserController = require('../controller/userController.js');

router.post("/check", UserController.loginUser);

router.get("/admin", middleware.ensureLoggedIn, UserController.sendAdmin);

router.post("/getall", middleware.ensureLoggedIn, UserController.getAll);

module.exports = router;

































































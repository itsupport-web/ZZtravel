const express = require('express');
const router = express.Router();

const middleware = require("../middleware/session.js");

const UserController = require('../controller/userController.js');

router.post("/check", UserController.loginUser);

router.get("/admin", middleware.ensureLoggedIn, UserController.sendAdmin);

router.post("/getall", middleware.ensureLoggedIn, UserController.getAll);

router.post("/reqedit", middleware.ensureLoggedIn, UserController.allowEdit);

router.get("/editcustomer", middleware.ensureLoggedIn, UserController.sendEditCustomer);

router.post("/getcustomerdetail", middleware.ensureLoggedIn, UserController.getCustomerDetail);

router.post("/updatecustomer", middleware.ensureLoggedIn, UserController.updateCustomer);

router.post("/deletecustomer", middleware.ensureLoggedIn, UserController.deleteCustomer);

router.post("/createcustomer", middleware.ensureLoggedIn, UserController.createCustomer);

router.post("/getlatestcustomerid", middleware.ensureLoggedIn, UserController.getLatestID);

module.exports = router;

































































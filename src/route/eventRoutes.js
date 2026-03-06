const express = require('express');
const router = express.Router();

const eventController = require('../controller/eventController.js');

router.post("/update", eventController.updateEvent);

router.post("/getall", eventController.getAll);

router.post("/create", eventController.createEvent);

router.post("/delete", eventController.deleteEvent);

router.post("/filter", eventController.filterEvent);

router.post("/getimage", eventController.getImage);

module.exports = router;
const express = require("express");
const router = express.Router();
const { shops: ctrl } = require("../../controllers");

router.get("/", ctrl.getAll);

module.exports = router;

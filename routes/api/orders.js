const express = require("express");
const router = express.Router();
const { orders: ctrl } = require("../../controllers");
const { authCheck } = require("../../middlewares/authCheck");

router.get("/:id", authCheck, ctrl.getAll);

router.post("/", ctrl.add);

module.exports = router;

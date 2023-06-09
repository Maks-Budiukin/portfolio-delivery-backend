const express = require("express");
const router = express.Router();
const { auth: ctrl } = require("../../controllers");
const { authCheck } = require("../../middlewares/authCheck");

router.post("/register", ctrl.register);

router.post("/login", ctrl.login);

router.get("/current", authCheck, ctrl.current);

router.get("/logout", authCheck, ctrl.logout);

module.exports = router;

const express = require("express");
const router = express.Router();
const { products: ctrl } = require("../../controllers");

router.get("/:id", ctrl.getByShop);

module.exports = router;

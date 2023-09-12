const express = require("express");
const router = express.Router();

const validations = require("../validations/relate");

const controller = require("../controllers/relateController");

router
    .post("/",validations,controller.add)
    .delete("/",validations,controller.delete)

module.exports = router;
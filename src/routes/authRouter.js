const express = require("express");
const router = express.Router();

const registerAuth = require("../validations/register");
const loginAuth = require("../validations/login");

const controller = require("../controllers/authController");

router
    .post("/register",registerAuth,controller.register)
    .post("/login",loginAuth,controller.login)

module.exports = router;
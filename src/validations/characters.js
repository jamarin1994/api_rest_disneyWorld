// dependencias del módulo
const {body} = require("express-validator");
const path = require("path");

// base de datos
const db = require("../database/models");

module.exports = [

    body("image")
    .custom((value,{req}) =>{
        let extensions = [".jpg",".png",".jpeg",".gif",".webp"]

        if(!req.file && req.method != "PUT"){
            throw new Error("required")
        }

        if(req.file && !extensions.includes(path.extname(req.file.originalname))){
            throw new Error("format error")
        }

        return true
    }),

    body("name")
    .notEmpty().withMessage("required")
    .isLength({max : 255}).withMessage("max charecter exceeded"),

    body("age")
    .notEmpty().withMessage("required")
    .isInt({min : 1}).withMessage("format error"),

    body("weight")
    .notEmpty().withMessage("required")
    .isInt({min : 1}).withMessage("format error"),

    body("history")
    .notEmpty().withMessage("required")
    .isLength({max : 1000}).withMessage("max charecter exceeded"),

]
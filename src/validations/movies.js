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

    body("title")
        .notEmpty().withMessage("required")
        .isLength({max : 255}).withMessage("max charecter exceeded"),

    body("creationDate")
        .notEmpty().withMessage("required")
        .isDate().withMessage("format error"),

    body("rating")
        .notEmpty().withMessage("required")
        .isInt({min : 1,max : 5}).withMessage("format error"),

    body("genderId")
        .notEmpty().withMessage("required")
        .isInt().withMessage("format error")
        .custom((value,{req}) =>{
            return db.genders.findByPk(value)
            .then(gender =>{
                if(!gender){
                    return Promise.reject();
                }
            }).catch(() => Promise.reject("the gender doesn't exist"))
        }),
    
]
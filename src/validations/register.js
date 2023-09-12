const db = require("../database/models");
const {body} = require("express-validator");

module.exports = [

    body("email")
        .notEmpty().withMessage("required")
        .isEmail().withMessage("format error")
        .custom((value,{req}) =>{
            return db.users.findOne({
                where: {
                    email: value
                }
            }).then(user =>{
                if(user){
                    return Promise.reject()
                }
            }).catch(() => Promise.reject("this email is already in use"))
        }),

    body("password")
        .notEmpty().withMessage("required")
        .isLength({min: 6}).withMessage("format error")
]
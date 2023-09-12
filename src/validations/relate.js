// dependencias del módulo
const {body} = require("express-validator");
const path = require("path");

// base de datos
const db = require("../database/models");

module.exports = [

    body("characterId")
    .notEmpty().withMessage("required")
    .custom((value,{req}) =>{
        return db.characters.findByPk(value)
        .then(character =>{
            if(!character){
                return Promise.reject();
            }
        }).catch(() => Promise.reject("El personaje no existe"))
    }),

    body("movieId")
    .notEmpty().withMessage("required")
    .custom((value,{req}) =>{
        return db.movies.findByPk(value)
        .then(movie =>{
            if(!movie){
                return Promise.reject();
            }
        }).catch(() => Promise.reject("la película no existe"))
    })
]
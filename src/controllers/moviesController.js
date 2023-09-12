// parámetros de base de datos y operadores
const db = require("../database/models");
const {Op} = require("sequelize");

// resultados de validaciones
const { validationResult } = require("express-validator");

// dependencias del módulo
const fs = require("fs");
const path = require("path"); 

module.exports = {

    list : (req,res) =>{
        db.movies.findAll({
            attributes : [ "id","image","title","creationDate" ],

            where : {
                title : {
                    [Op.substring] : req.query.title ? req.query.title : ""
                },

                genderId : {
                    [Op.substring] : req.query.gender ? req.query.gender : ""
                } 

            },

            order : [
                ["title",req.query.order && req.query.order.toUpperCase() == "DESC" ? req.query.order : "ASC"]
            ]
        }).then(movies =>{
            movies.forEach(movie => {
                movie.image = `${req.protocol}://${req.get("host")}/movies/${movie.image}`;
                movie.dataValues.url = `http://${req.get("host")}/movies/${movie.id}`
                movie.dataValues.id = undefined

            });
            const response = {
                meta : {
                    status : 200,
                    url : `${req.protocol}://${req.get("host")}${req.originalUrl}`,
                    moviesQuantity : movies.length
                },
                movies : movies.length > 0 ? movies : "No hay películas con estas condiciones"

            }
            res.status(200).json(response)
        }).catch(err =>{
            const response = {
                status : 500,
                msg : "Error Interno del Servidor"
            }

            console.log(err);
            res.status(500).json(response);
        })
    },

    detail : (req,res) =>{
        if(!isNaN(req.params.id)){
            db.movies.findByPk(req.params.id,{
                include : [
                    { association : "gender",},
                    { association : "characters", attributes : ["id","image","name"]},
                ]
            }).then(movie =>{
                if(!movie){
                    return Promise.reject();
                }
                movie.image = `${req.protocol}://${req.get("host")}/movies/${movie.image}`
                movie.dataValues.genderId = undefined
    
                movie.gender.image = `${req.protocol}://${req.get("host")}/genders/${movie.gender.image}`;
                
                movie.characters.forEach(character => character.image = `${req.protocol}://${req.get("host")}/characters/${character.image}`)
                movie.dataValues.characters.forEach(character =>{
                    character.dataValues.characterMovie = undefined
                    character.dataValues.url = `${req.protocol}://${req.get("host")}/characters/${character.id}`
                    character.dataValues.id = undefined
                })
                const response = {
                    meta : {
                        status : 200,
                        url : `${req.protocol}://${req.get("host")}${req.originalUrl}`,
                        CharactersQuantity : movie.characters.length
                    },
                    movie : movie
                }
    
                res.status(200).json(response)
            }).catch(err =>{
                const response = {
                    status : 404,
                    msg : "la película no existe"
                }
    
                console.log(err);
                res.status(404).json(response);
            })
        }else{
            const response = {
                status : 400,
                msg : "la identificación debe ser numérica"
            }

            res.status(400).json(response);
        }
    },

    create : (req,res) =>{
        const errors = validationResult(req);

        if(errors.isEmpty()){
            db.movies.create({
                image : req.file.filename,
                title : req.body.title,
                creationDate : req.body.creationDate,
                rating : +req.body.rating,
                genderId : +req.body.genderId
            }).then(movieCreated =>{
                const response = {
                    status : 201,
                    msg : "movie created successfully",
                    url : `${req.protocol}://${req.get("host")}/movies/${movieCreated.id}`
                }
    
                res.status(201).json(response);
                
            }).catch(err =>{
                req.file ? fs.unlinkSync(path.join(__dirname,"../uploads/movies/",req.file.filename)) : null;
    
                const response = {
                    status : 500,
                    msg : "Error Interno del Servidor"
                }
    
                console.log(err);
                res.status(500).json(response);
            })
        }else{
            req.file ? fs.unlinkSync(path.join(__dirname,"..","uploads","movies",req.file.filename)) : null;

            const response = {
                status : 400,
                msg : "error when creating the movie",
                errors : errors.mapped()
            }

            res.status(400).json(response);
        }
    },

    update : (req,res) =>{
        let oldImage;
        const errors = validationResult(req);

        db.movies.findByPk(req.params.id)
        .then(movie =>{
            if(!movie){
                return Promise.reject();
            }

            if(errors.isEmpty()){
                oldImage = movie.image;
                
                db.movies.update({
                    image : req.file ? req.file.filename : movie.image,
                    title : req.body.title,
                    creationDate : req.body.creationDate,
                    qualification : +req.body.qualification,
                    genderId : +req.body.genderId
                },{
                    where : {
                        id : movie.id
                    }
                }).then(movieUpdated =>{
                    req.file ? fs.unlinkSync(path.join(__dirname,"..","uploads","movies",oldImage)) : null

                    const response = {
                        status: 200,
                        msg : "movie updated successfully",
                        url : `${req.protocol}://${req.get("host")}/movies/${movie.id}`
                    }
        
                    res.status(200).json(response);

                }).catch(err =>{
                    req.file ? fs.unlinkSync(path.join(__dirname,"..","uploads","movies",req.file.filename)) : null
        
                    const response = {
                        status : 500,
                        msg : "Error Interno del Servidor",    
                    }

                    console.log(err);
                    res.status(500).json(response);
                })
            }else{
                req.file ? fs.unlinkSync(path.join(__dirname,"..","uploads","movies",req.file.filename)) : null
    
                const response = {
                    status : 400,
                    msg : "error when updated the movie",
                    errors : errors.mapped(),
                }
                res.status(400).json(response);
            }
        }).catch(err =>{
            req.file ? fs.unlinkSync(path.join(__dirname,"..","uploads","movies",req.file.filename)) : null

            const response = {
                status : 400,
                msg : "la película no existe",    
            }

            res.status(400).json(response);
        })
    },

    destroy : (req,res) =>{
        if(!isNaN(req.params.id)){
            db.movies.findByPk(req.params.id)
            .then(movie =>{
                if(!movie){
                    return Promise.reject();
                }

                fs.unlinkSync(path.join(__dirname,"..","uploads","movies",movie.image))

                db.movies.destroy({
                    where : {
                        id : movie.id
                    }
                }).then(result =>{
                    const response = {
                        status : 200,
                        msg : "movie deleted successfully",
                        url : `${req.protocol}://${req.get("host")}/movies/${req.params.id}`,
                    }
        
                    res.status(200).json(response);
                }).catch(err =>{
                    const response = {
                        status : 500,
                        msg : "Error Interno del Servidor"
                    }
        
                    console.log(err);
                    res.status(500).json(response);
                })
            }).catch(err =>{
                const response = {
                    status : 400,
                    msg : "la película no existe"
                }
    
                res.status(400).json(response);
            })
        }else{
            const response = {
                status : 400,
                msg : "la identificación debe ser numérica"
            }

            res.status(400).json(response);
        }
    },

}
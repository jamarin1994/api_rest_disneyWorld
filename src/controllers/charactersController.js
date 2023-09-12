// parámetros de base de datos y operadores
const db = require("../database/models");
const {Op} = require("sequelize"); 

// resultados de validaciones
const {validationResult} = require("express-validator");

// dependencias del módulo
const fs = require("fs");
const path = require("path");

module.exports = {

    list : (req,res) =>{
        db.characters.findAll({
            attributes : ["id","image","name"],

             
            include : req.query.movie ? [
                {association : "movies",
                    where : {
                        id : {
                            [Op.substring] : req.query.movie ? req.query.movie : ""
                        }
                    }
                }
            ] : null,

            where : {
                name : {
                    [Op.substring] : req.query.name ? req.query.name : ""
                },

                age : {
                    [Op.substring] : req.query.age ? req.query.age : ""
                },
                
                weight : {
                    [Op.substring] : req.query.weight ? req.query.weight : ""
                }, 

            },

            order : [
                ["name",req.query.order && req.query.order.toUpperCase() == "DESC" ? req.query.order : "ASC"]
            ]
        }).then(characters =>{
            characters.forEach(character => {
                character.image = `${req.protocol}://${req.get("host")}/characters/${character.image}`;
                character.dataValues.url = `${req.protocol}://${req.get("host")}/characters/${character.id}`;
                character.dataValues.id = undefined;
                character.dataValues.movies = undefined;
            });
            const response = {
                meta : {
                    status : 200,
                    url : `${req.protocol}://${req.get("host")}${req.originalUrl}`,
                    charactersQuantity : characters.length 
                },
                characters : characters.length > 0 ? characters : "no hay personajes con estas condiciones"
            } 
            res.status(200).json(response)
        }).catch(err =>{
            const response = {
                status : 500,
                msg : "Error Interno del Servidor"
            }

            res.status(500).json(response);
        })
    },

    detail : (req,res) =>{
        if(!isNaN(req.params.id)){
            db.characters.findByPk(req.params.id,{
                include : [
                    {association : "movies", attributes : ["id","image","title"]}
                ]
            }).then(character =>{
                character.image = `${req.protocol}://${req.get("host")}/characters/${character.image}`;
                character.movies.forEach(movie => movie.image = `${req.protocol}://${req.get("host")}/movies/${movie.image}`)
                character.dataValues.movies.forEach(movie =>{
                    movie.dataValues.characterMovie = undefined
                    movie.dataValues.url = `${req.protocol}://${req.get("host")}/movies/${movie.id}`
                    movie.dataValues.id = undefined
                })
    
                const response = {
                    meta : {
                        status : 200,
                        url : `${req.protocol}://${req.get("host")}${req.originalUrl}`,
                        moviesQuantity : character.movies.length    
                    },
                    character : character
                }
                res.status(200).json(response);
            }).catch(err =>{
                const response = {
                    status : 400,
                    msg : "El personaje no existe"
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

    create : (req,res) =>{
        const errors = validationResult(req);

        if(errors.isEmpty()){
            db.characters.create({
                image : req.file.filename,
                name : req.body.name,
                age : +req.body.age,
                weight : +req.body.weight,
                history : req.body.history
            }).then(characterCreated =>{
                    const response = {
                        status : 201,
                        msg : "personaje creado exitosamente",
                        url : `http://${req.get("host")}/characters/${characterCreated.id}`
                    }
                    res.status(201).json(response);
                
            }).catch(err =>{
                req.file ? fs.unlinkSync(path.join(__dirname,"..","uploads","characters",req.file.filename)) : null;
    
                const response = {
                    status : 500,
                    msg : "Error Interno del Servidor",
                }
    
                console.log(err);
                res.status(500).json(response);
            })
        }else{
            req.file ? fs.unlinkSync(path.join(__dirname,"..","uploads","characters",req.file.filename)) : null;

            const response = {
                status : 400,
                msg : "error al crear el personaje",
                errors : errors.mapped()
            }

            res.status(400).json(response);
        }
    },

    update : (req,res) =>{
        let oldImage;
        const errors = validationResult(req);
        
        db.characters.findByPk(req.params.id)
        .then(character =>{
            if(!character){
                return Promise.reject();

            }else if(errors.isEmpty()){
                oldImage = character.image

                db.characters.update({
                    image : req.file ? req.file.filename : character.image,
                    name : req.body.name,
                    age : +req.body.age,
                    weight : +req.body.weight,
                    history : req.body.history
                },{
                    where : {
                        id : character.id
                    }
                }).then(result =>{
                    req.file ? fs.unlinkSync(path.join(__dirname,"..","uploads","characters",oldImage)) : null

                    const response = {
                        status : 200,
                        msg : "personaje actualizado exitosamente ",
                        url : `${req.protocol}://${req.get("host")}/characters/${character.id}`
                    }

                    res.status(200).json(response);
                }).catch(err =>{
                    req.file ? fs.unlinkSync(path.join(__dirname,"..","uploads","characters",req.file.filename)) : null
        
                    const response = {
                        status : 500,
                        msg : "Error Interno del Servidor",    
                    }

                    console.log(err);
                    res.status(500).json(response);
                })
            }else{
                req.file ? fs.unlinkSync(path.join(__dirname,"..","uploads","characters",req.file.filename)) : null;
                
                const response = {
                    status : 400,
                    msg : "error al actualizar el personaje",
                    errors : errors.mapped()
                }

                res.status(400).json(response);
            }
        }).catch(err =>{
            req.file ? fs.unlinkSync(path.join(__dirname,"..","uploads","characters",req.file.filename)) : null;

            const response = {
                status : 400,
                msg : "El personaje no existe"
            }

            res.status(400).json(response);
        })
    },

    destroy : (req,res) =>{
        if(!isNaN(req.params.id)){
            db.characters.findByPk(req.params.id)
            .then(character =>{
                if(!character){
                    return Promise.reject()
                }else{
                    fs.unlinkSync(path.join(__dirname,"..","uploads","characters",character.image))

                    db.characters.destroy({
                        where : {
                            id : req.params.id
                        }
                    }).then(result =>{
                        const response = {
                            status : 200,
                            msg : "character deleted successfully ",
                            url : `http://${req.get("host")}/characters/${req.params.id}`
                        }
            
                        res.status(200).json(response);
                    }).catch(err =>{
                        const response = {
                            status : 500,
                            msg : "Error Interno del Servidor",
                        }
                        
                        console.log(err);
                        res.status(500).json(response);
                    })
                }
            }).catch(err =>{
                const response = {
                    status :400,
                    msg : "El personaje no existe"
                }
    
                res.status(400).json(response);
            })
        }else{
            const response = {
                status :400,
                msg : "la identificación debe ser numérica"
            }

            res.status(400).json(response);
        }
    },
    
}
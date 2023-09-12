// parámetros de base de datos y operadores
const db = require("../database/models");
const {Op} = require("sequelize");

// resultados de validaciones
const {validationResult} = require("express-validator");

module.exports = {

    add: (req,res) =>{
        const errors = validationResult(req);

        if(errors.isEmpty()){
            db.characterMovie.create({
                characterId: req.body.characterId,
                movieId: req.body.movieId 

            }).then(related =>{
                const response = {
                    status : 201,
                    msg : "relación creada exitosamente",
                }

                res.status(201).json(response);
            }).catch(err =>{
                const response = {
                    status : 500,
                    msg : "Error Interno del Servidor",
                }
    
                console.log(err);
                res.status(500).json(response);
            })
        }else{
            const response = {
                status : 400,
                msg : "error al procesar la relación",
                errors : errors.mapped()
            }

            res.status(400).json(response);
        }
    },

    delete: (req,res) =>{
        const errors = validationResult(req);

        if(errors.isEmpty()){
            db.characterMovie.destroy({
                where: {
                    [Op.and]: [{characterId: req.body.characterId}, {movieId: req.body.movieId}]
                }
            }).then(related =>{
                const response = {
                    status : 200,
                    msg : "relationship deleted successfully",
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
        }else{
            const response = {
                status : 400,
                msg : "error al procesar la relación",
                errors : errors.mapped()
            }

            res.status(400).json(response);
        }
    }
}
// dependencias del módulo
const express = require("express");
const router = express.Router();

// controlador del módulo
const controller = require("../controllers/charactersController");

// middlewares
const upload = require("../middlewares/charatersUploads");
const validations = require("../validations/characters");

router
    // todo
    .get("/",controller.list)

    // detalle
    .get("/:id",controller.detail)

    // crear
    .post("/",upload.single("image"),validations,controller.create)

    // actualizar
    .put("/:id",upload.single("image"),validations,controller.update)

    // eliminar
    .delete("/:id",controller.destroy)
    
module.exports = router;
// dependencias del módulo
const express = require("express");
const router = express.Router();

// module controller
const controller = require("../controllers/moviesController");

// middlewares
const upload = require("../middlewares/moviesUploads");
const validations = require("../validations/movies");

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
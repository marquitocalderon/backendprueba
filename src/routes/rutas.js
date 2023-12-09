const express = require("express");
const registrarUsuarios = require("../controllers/registrarUsuarios");




const router = express.Router();


router.get("/", (req, res) => {
    res.json({ saludos_de_parte_del_Administrador: "Hola para usar los datos ,necesitaras  de un token de autenticacion" });
  });

// Registar Usuarios
router.post("/registro-usuarios", registrarUsuarios);


module.exports = router;

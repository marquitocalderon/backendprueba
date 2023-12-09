const express = require("express");
const registrarUsuarios = require("../controllers/registrarUsuarios");
const loginUsuarios = require("../controllers/loginUsuarios");




const router = express.Router();


router.get("/", (req, res) => {
    res.json({ saludos_de_parte_del_Administrador: "Hola para usar los datos ,necesitaras  de un token de autenticacion" });
  });

// Registar Usuarios
router.post("/registro-usuarios", registrarUsuarios);
router.post("/login", loginUsuarios)

module.exports = router;

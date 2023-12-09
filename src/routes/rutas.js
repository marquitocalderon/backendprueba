const express = require("express");
const loginUsuarios = require("../controllers/loginUsuarios");
const { registrarUsuariosAdmin, registrarUsuarioCliente } = require("../controllers/registrarUsuarios");




const router = express.Router();


router.get("/", (req, res) => {
    res.json({ saludos_de_parte_del_Administrador: "Hola para usar los datos ,necesitaras  de un token de autenticacion me hablas" });
  });

// Registar Usuarios
router.post("/registro-admins", registrarUsuariosAdmin);
router.post("/registro-cliente", registrarUsuarioCliente);
router.post("/login", loginUsuarios)

module.exports = router;

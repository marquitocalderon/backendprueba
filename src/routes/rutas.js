const express = require("express");
const loginUsuarios = require("../controllers/loginUsuarios");
const {
  registrarUsuariosAdmin,
  registrarUsuarioCliente,
} = require("../controllers/registrarUsuarios");

const enviar_a_GMAIL = require("../controllers/recuperar_password/enviaraGmail");
const { comprobarTokendeRestablecerPassword, restablecerContra } = require("../controllers/recuperar_password/restablecerPassword");


const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    saludos_de_parte_del_Administrador:
      "Hola para usar los datos ,necesitaras  de un token de autenticacion ",
  });
});

// Registar Usuarios
router.post("/registro-admins", registrarUsuariosAdmin);
router.post("/registro-cliente", registrarUsuarioCliente);
router.post("/login", loginUsuarios);

router.post("/send-email",enviar_a_GMAIL)
router.post("/comprobar",comprobarTokendeRestablecerPassword)
router.post("/restablecer",restablecerContra)
module.exports = router;

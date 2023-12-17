const express = require("express");
const multer = require('multer');
const loginUsuarios = require("../controllers/loginUsuarios");
const {
  registrarUsuariosAdmin,
  registrarUsuarioCliente,
} = require("../controllers/registrarUsuarios");

const enviar_a_GMAIL = require("../controllers/recuperar_password/enviaraGmail");
const { comprobarTokendeRestablecerPassword, restablecerContra } = require("../controllers/recuperar_password/restablecerPassword");
const registrarHabitacionesConImagen = require("../controllers/subir_imagen/habitaciones");
const { getHabitaciones } = require("../controllers/subir_imagen/jalardatosconImagen");


const router = express.Router();

// Configuración de Multer para manejar la carga de archivos
const almacenamiento = multer.memoryStorage();

// Filtrar solo archivos de imagen
const filtro_de_archivo = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('El archivo no es una imagen'), false);
    
  }
};

const upload = multer({ 
  storage: almacenamiento,
  fileFilter: filtro_de_archivo
});

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

router.get("/habitaciones", getHabitaciones)
router.post("/imagen", upload.single('imagen'), registrarHabitacionesConImagen )




module.exports = router;

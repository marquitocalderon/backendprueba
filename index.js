const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const { conectarBaseDeDatos , conectar } = require("./conexion");
const rutas = require("./src/routes/rutas");
const { config } = require('dotenv');

const app = express();


// Aplicar el middleware cors a todas las rutas
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
conectarBaseDeDatos();

app.use(rutas);



config()





app.listen(process.env.PUERTO, () => {
  console.log(`El servidor esta corriendo en el puerto = ${process.env.PUERTO}`);
});

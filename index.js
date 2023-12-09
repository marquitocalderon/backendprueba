const express = require("express");
const cors = require("cors");
// const { conectarBaseDeDatos } = require("./conexion");


const app = express();
const port = 4000;

// Aplicar el middleware cors a todas las rutas
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// conectarBaseDeDatos();

// Ruta GET de bienvenida
app.get("/", (req, res) => {
    res.send("¡Bienvenido a mi aplicación!");
  });

app.listen(port, () => {
  console.log(`El servidor esta corriendo en el puerto = ${port}`);
});

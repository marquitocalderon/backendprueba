const express = require("express");
const cors = require("cors");
const { conectarBaseDeDatos , conectar } = require("./conexion");


const app = express();
const port = 4000;

// Aplicar el middleware cors a todas las rutas
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
conectarBaseDeDatos();

// Ruta GET de bienvenida
app.get("/", (req, res) => {
    res.send("¡Bienvenido a mi aplicación!");
  });

// Ruta GET para obtener perfiles desde la base de datos
app.get("/perfiles", async (req, res) => {
    try {
      // Consulta SQL para obtener todos los perfiles
      const result = await conectar.query("SELECT * FROM perfiles");
  
      // Enviar los resultados como respuesta
      res.json(result.rows);
    } catch (error) {
      console.error("Error al obtener perfiles:", error);
      res.status(500).send("Error interno del servidor");
    }
  });

app.listen(port, () => {
  console.log(`El servidor esta corriendo en el puerto = ${port}`);
});

const { conectar } = require("../../conexion");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginUsuarios = async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const selectUsuarios = `
          SELECT usuarios.idusuario, usuarios.usuario, usuarios.nombre_completo ,usuarios.estado, usuarios.dni, usuarios.password, usuarios.fecha_creacion, perfiles.nombre_perfil
          FROM usuarios
          INNER JOIN perfiles ON usuarios.idperfil = perfiles.idperfil
          WHERE usuarios.usuario = $1;
        `;

    const resultados = await new Promise((resolve, reject) => {
      conectar.query(selectUsuarios, [usuario], (error, resultados) => {
        if (error) {
          console.error(error);
          reject("Error al obtener usuarios");
        } else {
          resolve(resultados);
        }
      });
    });

    const respuestaBasedeDatos = resultados.rows[0];

    // verificar el usuario
      
    // ver por consola que datos recibo de la base de datos
    // console.log(respuestaBasedeDatos)

    if (respuestaBasedeDatos) {
      const passwordDescifrado = bcryptjs.compareSync(
        password,
        respuestaBasedeDatos.password
      );
      // verificar la contraseña
      if (passwordDescifrado) {
      
      // Verificar el estado del usuario si no esta eliminado
        if (respuestaBasedeDatos.estado) {
           // en caso de exito poner los datos en el token
          // payload es lo que hace que tu token tenga tus datos de usuario
          const payload = {
            idusuario: respuestaBasedeDatos.idusuario,
            nombre_completo: respuestaBasedeDatos.nombre_completo,
            dni : respuestaBasedeDatos.dni,
            usuario: respuestaBasedeDatos.usuario,
            perfil: respuestaBasedeDatos.nombre_perfil,
          };
  
          const token = jwt.sign(payload, "marquinho1701", { expiresIn: "10s" });
          const refreshToken = jwt.sign(payload, "actualizacion", {
            expiresIn: "7d",
          });
  
      
          res.status(200).json({ token, refreshToken });
        } else {
          res.status(401).send("Este Usuario esta Eliminado");
        }
      } else {
        res.status(401).send("Password Incorrecto");
      }
    } else {
      res.status(401).send("Usuario no Encontrado");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Interno del Servidor");
  }
};

module.exports = loginUsuarios;

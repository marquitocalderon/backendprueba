const { conectar } = require("../../conexion");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registrarUsuariosAdmin = async (req, res) => {
  const {nombre_completo, correo, dni, departamento, provincia, distrito, usuario, password } = req.body;
  const estado = 1;
  const idperfil = 1

  const passwordHasheado = await bcryptjs.hash(password, 8);

  try {
    const insertUsuario = `
      INSERT INTO usuarios (nombre_completo,correo,dni,departamento , provincia, distrito, usuario, password, estado, idperfil)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8 , $9, $10);
    `;

    await new Promise((resolve, reject) => {
      conectar.query(
        insertUsuario,
        [nombre_completo,correo,dni,departamento, provincia, distrito, usuario, passwordHasheado, estado, idperfil],
        (error) => {
          if (error) {
            // Verificar si el error es por violación de la restricción de unicidad
            if (
              error.code === "23505" &&
              error.constraint === "usuarios_usuario_key"
            ) {
              // Enviar una respuesta al cliente indicando que el usuario ya existe
              res.status(400).send({ error: "El usuario ya existe." });
            } 
            else if (
              error.code === "23505" &&
              error.constraint === "usuarios_dni_key"
            ) {
              // Enviar una respuesta al cliente indicando que el usuario ya existe
              res.status(400).send({ error: "El DNI ya existe." });
            }
            else if (
              error.code === "23505" &&
              error.constraint === "usuarios_correo_key"
            ) {
              // Enviar una respuesta al cliente indicando que el usuario ya existe
              res.status(400).send({ error: "El correo ya existe." });
            }
            else {
              console.error(error);
              reject("Error al registrar usuario");
              res.status(400).send({ error: "El dni debe tener 8 digitos." });
            }
          } else {
            resolve();
          }
        }
      );
    });

    res.status(200).send({respuesta: "se guardo correctamente el usuario"});
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};


const registrarUsuarioCliente = async (req, res) => {
  const {nombre_completo, dni, correo, departamento, provincia, distrito, usuario, password } = req.body;
  const estado = 1;
  const idperfil = 2

  const passwordHasheado = await bcryptjs.hash(password, 8);

  try {
    const insertUsuario = `
      INSERT INTO usuarios (nombre_completo,correo, dni,departamento , provincia, distrito, usuario, password, estado, idperfil)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8 , $9, $10);
    `;

    await new Promise((resolve, reject) => {
      conectar.query(
        insertUsuario,
        [nombre_completo,correo,dni,departamento, provincia, distrito, usuario, passwordHasheado, estado, idperfil],
        (error) => {
          if (error) {
            // Verificar si el error es por violación de la restricción de unicidad
            if (
              error.code === "23505" &&
              error.constraint === "usuarios_usuario_key"
            ) {
              // Enviar una respuesta al cliente indicando que el usuario ya existe
              res.status(400).send({ error: "El usuario ya existe." });
            } 
            else if (
              error.code === "23505" &&
              error.constraint === "usuarios_dni_key"
            ) {
              // Enviar una respuesta al cliente indicando que el usuario ya existe
              res.status(400).send({ error: "El DNI ya existe." });
            }
            else if (
              error.code === "23505" &&
              error.constraint === "usuarios_correo_key"
            ) {
              // Enviar una respuesta al cliente indicando que el usuario ya existe
              res.status(400).send({ error: "El correo ya existe." });
            }
            else {
              console.error(error);
              reject("Error al registrar usuario");
              res.status(400).send({ error: "El dni debe tener 8 digitos." });
            }
          } else {
            resolve();
          }
        }
      );
    });

    res.status(200).send({respuesta: "se guardo correctamente el usuario"});
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = {registrarUsuariosAdmin ,registrarUsuarioCliente};

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { conectar } = require("../../../conexion");

const comprobarTokendeRestablecerPassword = async (req, res, next) => {
  // Obtener el token del cuerpo de la solicitud
  const { token } = req.body;
  // Verificar si el token está presente
  if (!token) {
    return res.status(401).json({
      mensaje: "Acceso no autorizado. Por favor, proporcione un token.",
    });
  }

  try {
    // Verificar la validez del token
    const decoded = jwt.verify(token, "marquinho1701");
    const authenticacion = decoded.contra;
    // Responder con un mensaje de éxito
    return res
      .status(200)
      .json({ mensaje: "Token válido. Acceso autorizado.", authenticacion });
  } catch (error) {
    // Token no válido, responder con un mensaje de error
    return res.status(401).json({ mensaje: "Token no válido." });
  }
};

const restablecerContra = async (req, res, next) => {
  // Obtener el token del cuerpo de la solicitud
  const { usuario, correo, password } = req.body;
  // Verificar si el token está presente

  const selectUsuarios = `
    SELECT usuarios.idusuario, usuarios.usuario, usuarios.correo
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

  if (respuestaBasedeDatos) {
    if (respuestaBasedeDatos.correo === correo) {
      const updateContraseña = `
        UPDATE usuarios
        SET password = $1
        WHERE idusuario = $2;
        `;
      const nuevaContraseñaHash = await bcryptjs.hash(password, 8);
      conectar.query(
        updateContraseña,
        [nuevaContraseñaHash, respuestaBasedeDatos.idusuario],
        (error, resultado) => {
          if (error) {
            console.error(error);
            return res.status(500).send("Error al actualizar la contraseña");
          }

          // La contraseña se ha actualizado correctamente
          res.status(200).send("Contraseña actualizada con éxito");
        }
      );
    } else {
      res.status(401).send("Correo no Valido con el Usuario");
    }
  } else {
    res.status(401).send("Usuario no Encontrado");
  }
};

module.exports = { comprobarTokendeRestablecerPassword, restablecerContra };

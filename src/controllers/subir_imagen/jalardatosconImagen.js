const { conectar } = require("../../../conexion");

const getHabitaciones = async (req, res) => {

  try {
    const selectUsuarios = `
      SELECT * FROM habitaciones
    `;

    const resultados = await new Promise((resolve, reject) => {
      conectar.query(selectUsuarios, (error, resultados) => {
        if (error) {
          console.error(error);
          reject("Error al obtener habitaciones");
        } else {
          resolve(resultados);
        }
      });
    });

    const respuestaBasedeDatos = resultados.rows; // Access the data directly

    res.json(respuestaBasedeDatos); // Send the data as JSON response

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getHabitaciones };

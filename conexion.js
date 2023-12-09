const { Client } = require('pg');

// Configuración de la conexión a PostgreSQL
const conectar = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'prueba',
  password: 'marquinho1701',
  port: 5432, // Puerto predeterminado de PostgreSQL
});

// Función para conectar y manejar la lógica de conexión
async function conectarBaseDeDatos() {
    try {
      await conectar.connect();
      console.log('Conexión exitosa a PostgreSQL');
    } catch (error) {
      console.error('Error al conectar a PostgreSQL:', error.message);
    }
}

module.exports = {conectarBaseDeDatos , conectar}


const cloudinary = require('cloudinary').v2;
const { conectar } = require("../../../conexion");

cloudinary.config({
  cloud_name: 'dc4rcnqkl',
  api_key: '741854327165235',
  api_secret: 'iaeqAwrqS3Ae2VkwrO496j5Otcs'
});

const registrarHabitacionesConImagen = async (req, res) => {
    try {
      const imagenRecibida = req.file ? req.file.buffer : null;
      const { numero_habitacion, tipo_habitacion, precio } = req.body;
      const disponible = 1;
  
      if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
      }
  
      // Subir la imagen a Cloudinary
      const resultadoCloudinary = await cloudinary.uploader.upload_stream(
        { resource_type: 'image' },
        async (error, result) => {
          if (error) {
            console.error('Error al subir la imagen a Cloudinary:', error);
            return res.status(500).json({ error: 'Error interno del servidor' });
          }
  
          const insertHabitacion = `
            INSERT INTO habitaciones (numero_habitacion, imagen, tipo_habitacion, precio, disponible)
            VALUES ($1, $2, $3, $4, $5);
          `;
  
          const imagenUrl = result.secure_url;
  
          try {
            await conectar.query(insertHabitacion, [
              numero_habitacion,
              imagenUrl,
              tipo_habitacion,
              precio,
              disponible,
            ]);
            res.json({
              mensaje: 'Archivo de imagen recibido y subido a Cloudinary exitosamente se guardo todo en la base de datos'
            });
          } catch (error) {
            // Verificar si el error es por violación de la restricción de unicidad
            if (
              error.code === '23505' &&
              error.constraint === 'habitaciones_numero_habitacion_key'
            ) {
              // Enviar una respuesta al cliente indicando que la habitación ya está registrada.
              res.status(400).send({ error: 'La habitación ya está registrada.' });
            } else {
              console.error(error);
              res.status(500).json({ error: 'Error interno del servidor' });
            }
          }
        }
      ).end(imagenRecibida);
    } catch (error) {
      console.error('Error en la carga y procesamiento de la imagen:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
  

  module.exports = registrarHabitacionesConImagen
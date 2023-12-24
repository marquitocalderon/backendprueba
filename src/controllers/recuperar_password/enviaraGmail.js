const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const  jwt = require("jsonwebtoken");

const enviar_a_GMAIL = async (req, res) => {
  const { correo } = req.body;

  const CLIENT_ID = "69558064090-4ot1f7uqnvidmgk61fu3fot6lajth5va.apps.googleusercontent.com";
  const CLIENT_SECRET = "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";
  const REDIRECT_URL = "https://developers.google.com/oauthplayground";
  const REFRESH_TOKEN = "1//04vu9j5lSzBLVCgYIARAAGAQSNwF-L9IrDAAnLUrpDigcbkmhJtxJIVvUiquM6TduDxRf2mhpLv_UW0GO7Upn2XIKcXr5pj-3G9w";

  const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
  );

  oAuth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN
  });

  async function sendEmail() {
    try {
      const accessToken = await oAuth2Client.getAccessToken();
      const transporte = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "markoeldotado@gmail.com",
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken
        }
      });

      const resetLink = 'https://hotel-frontend-p2kt.onrender.com/restablecer'; // Reemplaza esto con la URL real de reseteo de contraseña

      const payload = {
        contra: "markustlv",
      };

      const token = jwt.sign(payload, "marquinho1701", { expiresIn: "1d" });

      const contentHTML = `
        <h1>Recuperación de contraseña</h1>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${resetLink}">${resetLink}</a>
        <br />
        <p>Guarda este Token  para generar tu nueva contraseña : </p>
        <h2> ${token} </h2>



        <h3>El token vence en un dia ten encuenta eso , si se vence ya tendras que generar otro restablecer</h3>
        
      `;

      const mailOptions = {
        from: "markoeldotado@gmail.com",
        to: correo,
        subject: "Recuperación de contraseña",
        html: contentHTML
      };

      const respuesta = await transporte.sendMail(mailOptions);
      return respuesta;
    } catch (error) {
      console.log(error);
    }
  }

  try {
    const respuesta = await sendEmail();
    res.status(200).send("Correo enviado");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al enviar el correo");
  }
};

module.exports = enviar_a_GMAIL;

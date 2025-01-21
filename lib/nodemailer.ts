import * as nodemailer from "nodemailer";
async function sendEmail(toEmail: string, verificationCode: number) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: {
      name: "Passwordless test",
      address: process.env.USER_EMAIL,
    }, // sender address
    to: [toEmail], // list of receivers
    subject: `Testing Passwordless auth`, // Subject line
    text: "", // plain text body
    html: `<b>Este es el codigo para verificar tu ingreso: ${verificationCode} </b>`, // html body
  };
  const sendMail = async (transporter, mailOptions) => {
    try {
      await transporter.sendMail(mailOptions);
      console.log("email enviado ok");
    } catch (error) {
      console.error(error);
    }
  };
  sendMail(transporter, mailOptions);
}
export { sendEmail };

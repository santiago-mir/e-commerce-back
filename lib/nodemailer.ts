import * as nodemailer from "nodemailer";

type emailResponse = {
  message: string;
};
async function sendEmail(
  toEmail: string,
  verificationCode: number
): Promise<emailResponse> {
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
      name: "Verification Code",
      address: process.env.USER_EMAIL,
    }, // sender address
    to: [toEmail], // list of receivers
    subject: `Codigo para verificar ingreso`, // Subject line
    text: "", // plain text body
    html: `<b>Este es el codigo para verificar tu ingreso: ${verificationCode} </b>`, // html body
  };
  const sendMail = async (transporter, mailOptions) => {
    try {
      const res = await transporter.sendMail(mailOptions);
      return { message: res.response };
    } catch (error) {
      console.error(error);
    }
  };
  const response: emailResponse = await sendMail(transporter, mailOptions);
  return response;
}
export { sendEmail };

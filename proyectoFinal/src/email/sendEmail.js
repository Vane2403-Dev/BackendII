
import nodemailer from "nodemailer";
import envsConfig from "../config/env.config.js";

export const sendEmail = async (template, subject, email) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: "vcp2403@gmail.com",
      pass: envsConfig.GMAIL_PASS
    }
  })

  // Configuramos el envío del correo electrónico

  await transport.sendMail({
    from: "vcp2403@gmail.com",
    to: email,
    subject: subject,
    html:template,

  })
}
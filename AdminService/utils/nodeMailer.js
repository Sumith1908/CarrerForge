// emailHelper.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gunjansamrit613@gmail.com',
    pass: 'kagd nitj ensf vnfr'
  }
});

function sendEmail(to, subject, text) {
  const mailOptions = {
    from: 'gunjansamrit613@gmail.com',
    to,
    subject,
    text
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
}

module.exports = { sendEmail };

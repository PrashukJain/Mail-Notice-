"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
module.exports.sendEmail=async function (html) {
  // Generate test SMTP service account from ethereal.email
  

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service:"gmail",
    host: "smtp.gmail.com",
    secure: true, // true for 465, false for other ports
    auth: {
      user: "jain1prashuk1@gmail.com", // generated ethereal user
      pass: "mvtuxzzdcdzzbgxy", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Prashuk 👻" <jain1prashuk1@gmail.com>', // sender address
    to: "prashukjain7524@gmail.com,jain1prashuk1@gmail.com", // list of receivers
    subject: "NOTICE", // Subject line
    // text: "Hello world?", // plain text body
    html: html, // html body
  });


//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
 }

// main().catch(console.error);
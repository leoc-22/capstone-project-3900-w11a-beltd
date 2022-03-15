//TODO CREDIT

require('dotenv').config()

const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const { getMaxListeners } = require("process");

const sendEmail = async (email, subject, payload, template) => {
  try {

    // Create transporter object
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'booklab3900@gmail.com',
        pass: 'Beltd3900'
        //user: process.env.MAIL_USERNAME,
        //pass: process.env.MAIL_PASSWORD,
        //clientId: process.env.OAUTH_CLIENTID, // TODO ADD TO .env
        //clientSecret: process.env.OAUTH_CLIENT_SECRET,
        //refreshToken: process.env.OAUTH_REFRESH_TOKEN
      }
    });

    // Create mailOptions object
    // TO DO CHANGE WHEN TESTING FR
    let mailOptions = {
      from: "booklab3900@gmail.com", 
      to: "booklab3900@gmail.com", // email
      subject: "Email test 1", // subject
      text: "Helo" // template or in html field
    };

    // Send mail!!
    transporter.sendMail(mailOptions, function(err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Email sent!")
      }
    });






    /*
    // Generest test SMTP service from ethereal.email
    let testAccount = await nodemailer.createTestAccount();

    console.log("email generated");

    // // create reusable transporter object using the default SMTP transport
    // const transporter = nodemailer.createTransport({
    //   host: "smtp.ethereal.email",
    //   port: 587,
    //   secure: false,
    //   auth: {
    //     user: testAccount.user,
    //     pass: testAccount.pass,
    //   },
    // });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "leoc.001re@gmail.com",
        pass: "Panther980928Leo",
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      },
      debug: true, // show debug output
      logger: true, // log information in console
    });

    // const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    // const compiledTemplate = handlebars.compile(source);
    // const options = () => {
    //   return {
    //     from: testAccount.user, //UNSURE IF DIS WORKS
    //     to: email,
    //     subject: subject,
    //     html: compiledTemplate(payload),
    //   };
    // };

    // send mail with defined transport object
    // let info = await transporter.sendMail({
    //   from: "mervin.hammes53@ethereal.email",
    //   to: "leoc.001re@gmail.com",
    //   subject: "Hello",
    //   text: "Hello world?",
    //   html: "<b>Hello world?</b>",
    // });

    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });

    var mailOptions = {
      from: "leoc.001re@gmail.com",
      to: "z5261846@ad.unsw.edu.au",
      subject: "Sending Email using Node.js",
      text: "That was easy!",
      html: "<b>Hello world?</b>",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    //   // Send email
    //   transporter.sendMail(options(), (error, info) => {
    //     if (error) {
    //       return error;
    //     } else {
    //       return res.status(200).json({
    //         success: true,
    //       });
    //     }
    //   });
    */
  } catch (error) {
    return error;
  }
};

module.exports = sendEmail;

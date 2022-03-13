//TODO CREDIT

const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const sendEmail = async (email, subject, payload, template) => {
  try {
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
  } catch (error) {
    return error;
  }
};

module.exports = sendEmail;

var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

const SendEmailUtility = async (
  EmailTo,
  subject = "Password Reset",
  EmailText
) => {
  var transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    })
  );

  var mailOptions = {
    from: "egolap.com <egolap2@gmail.com>",
    to: [EmailTo],
    subject: subject,
    text: EmailText,
  };

  return await transporter.sendMail(mailOptions);
};

module.exports = SendEmailUtility;

// {
//   if (error) {
//     (error);
//   } else {
//     ("Email sent: " + info.response);
//   }
// });

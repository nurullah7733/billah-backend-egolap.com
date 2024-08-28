var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

const SendEmailUtility = async (
  EmailTo,
  subject = "Password Reset",
  emailBody,
  attachmentBuffer = null,
  attachmentFilename = "attachment.pdf"
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
    html: emailBody,
    attachments: attachmentBuffer
      ? [
          {
            filename: attachmentFilename,
            content: attachmentBuffer,
            contentType: "application/pdf",
          },
        ]
      : [],
  };

  return await transporter.sendMail(mailOptions);
};

module.exports = SendEmailUtility;

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////

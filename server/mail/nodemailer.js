const nodemailer = require('nodemailer');
const fs = require('fs');
const mjml2html = require('mjml').mjml2html;

const TEMPLATE_PATH_INQUIRY = "server/resources/mail/templates/inquiry.mjml";

const SORRY_NO_EMAIL_SPECIFIED = "Sorry, no email specified.";
const SORRY_NO_PHONE_SPECIFIED = "Sorry, no phone specified.";

const EMAIL_FROM = "slasti.od.ua 👻";
const EMAIL_SUBJECT = "You've got a new order request!";

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

exports.sendInquiryNotification = function(inquiry) {
    let file = fs.readFileSync(TEMPLATE_PATH_INQUIRY, "utf-8");

    const mailNotification = new Function("return `"+file+"`;");

    const htmlOutput = mjml2html(mailNotification.call({
        name: inquiry.name,
        email: inquiry.email || SORRY_NO_EMAIL_SPECIFIED,
        phone: inquiry.phone || SORRY_NO_PHONE_SPECIFIED,
        timeToCall: inquiry.timeToCall,
        comment: inquiry.comment
    }));

    // setup email data with unicode symbols
    let mailOptions = {
        from: EMAIL_FROM, // sender address
        cc: process.env.GMAIL_CC, // list of receivers
        to: process.env.GMAIL_TO,
        subject: EMAIL_SUBJECT, // Subject line
        html: htmlOutput.html // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
};

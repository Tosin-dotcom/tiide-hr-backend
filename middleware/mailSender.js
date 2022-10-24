const nodemailer = require('nodemailer');
require('dotenv').config();

const sendMail = (from, to, subject, content, htmlContent) => {
    let mailSender = nodemailer.createTransport({
        // port : 465,
        // host : "mail.rubynav.com",
        // secure : true,
        service : 'gmail',
        auth : {
            user : 'eduvieouu@gmail.com',
            pass : 'kunbbsshczithjqs'
        }
    })

    mailSender.sendMail({
        from : from,
        to : to,
        subject : subject,
        text : content,
        html : htmlContent
    })
}

module.exports = sendMail;
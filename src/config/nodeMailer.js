import nodemailer from 'nodemailer';
import config from './env.config.js';
 console.log(config.nodeMailerGmail);
 console.log(config.nodeMailerPassword);
// create transporter object
const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: false,
    auth: {
        user: config.nodeMailerGmail,
        pass: config.nodeMailerPassword,
    },
});


export default transporter;
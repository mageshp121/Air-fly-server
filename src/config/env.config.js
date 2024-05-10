import dotenv from 'dotenv';
dotenv.config();
// RAZORPAY_KEYID="rzp_test_9JJIiwQqbIYAr6"
// RAZORPAY_SECRET="gYeKFU2ckI3ru0qvbOEvfNuY"
const config = {
    port: process.env.PORT || 8000,
    mongoURI: process.env.MONGODB_URI,
    nodeMailerGmail: process.env.NODEMAILER_EMAIL,
    nodeMailerPassword:process.env.NODEMAILER_PASSWORD,
    jwtSecret: process.env.JWT_SECRET,
    nodeEnvironment: process.env.NODE_ENV,
    authRoles: {
        admin: "admin",
        user: "user",
    },
    allowedOrigins:process.env.CORS_ORIGIN,
    razor_pay_key:process.env.RAZORPAY_KEYID,
    razor_pay_secret:process.env.RAZORPAY_SECRET,
};

export default config;

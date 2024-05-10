import asyncHandler from 'express-async-handler';
import { ERROR } from '../utils/errors.js';
import authRepositories from '../repositories/authRepositories.js';
import otpServices from '../services/otpServices.js';
import authServices from '../services/authServices.js';
import config from '../config/env.config.js';
import flightRepository from '../repositories/flightRespositories.js';

const authController = {

    // Controller method for registering with email
emailRegister: asyncHandler(async (req, res, next) => {
    console.log("hitting");
        const { email } = req.body;
       console.log(req.body,"bodyy");
        // 1. Check the database for existing email
        let existingUser = await authRepositories.findUserByEmail(email)
        console.log(existingUser,"existeing user");
        // 2. If user doesn't exist, register and send OTP; else, send OTP
        if (!existingUser) {
            const userEntity = {
                email: email
            }
            existingUser = await authRepositories.createUserByEmail(userEntity);
        }



        //  const addedDate = await flightRepository.createFly();
        //  console.log(addedDate,'addd');
        // 3. Send OTP
        const otp = await otpServices.sendOTP(email)

        // 4. Create temporary OTP document with TTL
        const otpDocs = await authRepositories.createOtpDocument(otp, email)

        // Return response with OTP document
        return res.status(200).json({ message: 'Registration successful, please verify otp', otpDocs });
    }),

    // Controller method for verifying email with OTP and login
    emailVerifyAndLogin: asyncHandler(async (req, res, next) => {
        const { otp, email } = req.body;
         
        // 1. Check the database for existing email
        let existingUser = await authRepositories.findUserByEmail(email)
        if (!existingUser) throw new ERROR.NotFoundError("User not found ..")

        // 2. Check if OTP document exists
        const otpDocs = await authRepositories.findUOtpDocument(email)
        if (!otpDocs) throw new ERROR.OTPExpiredError("Your entered otp is expired, try again ..")

        // 3. Verify OTP
        const is_verified = await otpServices.verifyOTP(otp, otpDocs.otp)
        if (!is_verified) throw new ERROR.OtpMismatchError('Wrong OTP!')

        // 4. Update user profile with email verification
        const updatedUser = await authRepositories.updateUserEmailVerification(email)

        // 5. Generate JWT token
        const payload = {
            userId: existingUser._id.toString(),
            email: existingUser.email,
            roles: [config.authRoles.user]
        }
        const token = await authServices.generateToken(payload)

        // 6. Attach token to HTTP-only cookie
        authServices.attachTokenToCookie('jwt', token, res)

        // 7. Send response
        return res.status(200).json({ message: 'User verified successfully', updatedUser });
    }),

    // Controller method for logging out
    logOut: asyncHandler(async (req, res, next) => {
        try {
            // Clear JWT cookie
            res.clearCookie('jwt')

            // Send logout successful message
            res.status(200).json({ message: 'logout successful' })
        } catch (error) {
            next(error)
        }
    }),
};

export default authController;

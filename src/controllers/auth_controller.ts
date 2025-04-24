import redis from "../utils/redis"
import ms from "ms";
import { encryptPassword, comparePasswords } from "../utils/bcrypt";
import { generateAccessToken, generateRefreshToken, generateResetToken, generateVerificationToken, verifyResetToken, verifyVerificationToken } from "../utils/jwt";
import userQueries from "../config/db_queries/user_queries";
import { sendEmailVerificationLink, sendPasswordResetEmail } from "../config/emailConfig";
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { loginSchema, registerSchema, forgotPasswordSchema, resetPasswordSchema } from "../schemas/user_schema";




const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const value = registerSchema.safeParse(req.body);
        
        if (!value.success) {
            return res.status(400).json({
                success: false,
                error: value.error.format()
            })
        }

        const { name, email, password } = value.data;

        const existingEmail = await userQueries.getUserWithEmail(email);

        if (existingEmail) return res.status(400).json({
            success: false,
            error: "User with this email already exists"
        })

        const hashedPassword = await encryptPassword(password);

        const verificationToken = generateVerificationToken(email);
        
        const expiresIn = 600
        await redis.setex("name", expiresIn, name);
        await redis.setex("email", expiresIn, email);
        await redis.setex("password", expiresIn, hashedPassword);
        await redis.setex("verification-token", expiresIn, verificationToken); 

        await sendEmailVerificationLink(email);

        res.status(201).json({
            success: true,
            message: "An Email Verification link sent to you. Please verify"
        })

    } catch (error) {
        next(error)
    }
}

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const token = await redis.get("verification-token");

        const verificationToken = verifyVerificationToken(token!);

        if (!verificationToken) return res.status(401).json({
            success: false,
            error: "Invalid verification token. Please register"
        })

        const name = await redis.get("name");
        const email = await redis.get("email");
        const password = await redis.get("password");
        const isVerified = true; 

        const results = await userQueries.createUser(name!, email!, password!, isVerified);

        if (!results) return res.status(500).json({
            success: false,
            error: "Error creating user"
        })

        res.status(200).send("<h1> User verified successfully!. You can now login </h1>")
    } catch (error) {
        next(error)
    }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {

         const value = loginSchema.safeParse(req.body);
                
         if (!value.success) return res.status(400).json({
                success: false,
                error: value.error.format()
            })

        const { email, password } = value.data;

        const user = await userQueries.getUserWithEmail(email);

        if (!user) return res.status(404).json({ 
            success: false,
            error: "User not found. Please register or confirm your details" 
        })
 
        const storedHashedPassword = user.password;
        const user_id = user.user_id;
        const name = user.name;
        const isVerified = user.isVerified;

        const match = await comparePasswords(password, storedHashedPassword);
        
        if (!match) return res.status(400).json({ 
                success: false,
                error: "Passwords don\'t match" 
            })
        
        const accessToken = generateAccessToken(user_id);

        const refreshToken = generateRefreshToken(user_id); 

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/api/refresh-token'
        })

        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: "/api/refresh-token",
            maxAge: ms('3d')
        })

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: ms('10m')
        })

        res.status(201).json({
            success: true,
            message: "User login successful!",
            user: {
                user_id: user_id,
                name: name,
                email: email,
                isVerified: isVerified
            }
        })

    } catch (error) {
        next(error)
    }
}

const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const access_token: string = req.cookies['accessToken'];
        const refresh_token: string = req.cookies['refreshtoken'];


        if (!access_token) return res.status(401).json({
                success: false,
                error: "Token not found. Please login again"
        })
        
        const expiresIn: number = 900;
        await redis.setex(access_token, expiresIn, "blacklisted");
        await redis.setex(refresh_token, expiresIn, "blacklisted");
        

        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: "/api/refresh-token"
        })
        res.status(200).json({
            success: true,
            message: "User logged out successfully!"
        })

    } catch (error) {
        next(error)
    }
}

const requestPasswordReset = async(req: Request, res: Response, next: NextFunction) => {
    
    try {
        const value = forgotPasswordSchema.safeParse(req.body);
                
        if (!value.success) return res.status(400).json({
            success: false,
            error: value.error.format()
        })        
        

        const {email} = value.data;

        const user = await userQueries.getUserWithEmail(email);

        if (!user) return res.status(404).json({
            success: false,
            error: "User not found"
        });

        const resetToken = generateResetToken(user.user_id);

        const expiresIn = 600;

        await redis.setex("reset-token", expiresIn, resetToken);

        await sendPasswordResetEmail(user.email);

      
        res.status(201).json({
            success: true,
            message: "Your password reset email has been sent to you."
        })

    } catch (error) {
        next(error)
    }
}



const resetPassword = async(req: Request, res: Response, next: NextFunction) => {
  try {
        const value = resetPasswordSchema.safeParse(req.body);
                        
        if (!value.success) return res.status(400).json({
            success: false,
            error: value.error.format()
        })

        type DataType = {
            password: string
        }

        const data: DataType = value.data;

        const resetToken = await redis.get("reset-token");

        if (!resetToken) return res.status(401).json({
            success: false,
            error: "No reset token provided. Go back to forgot password"
        })

        const verified = verifyResetToken(resetToken) as JwtPayload;

        if (!verified) return res.status(401).json({
            error: "Invalid reset token. go back to forgot password"
        })
        
        const user = await userQueries.getUserWithId(verified.user_id);
  
        const currentPassword = user.password;

        const match = await comparePasswords(data.password, currentPassword);

        if (match) return res.status(400).json({
            success: false,
            error: "Passwords must not match. change it for better security."
        })

        const encryptedPassword = await encryptPassword(data.password);
        
        const results = await userQueries.updateUser(
            user.name,
            user.email,
            encryptedPassword,
            user.user_id
        );

        if (!results) return res.status(500).json({
            success: false,
            error: "Something went wrong"
        })


        res.status(200).json({
            success: true,
            message: "Password reset successful!",
            result: `This user can now login with the new password`
        }) 
  } catch (error) {
     next(error)
  }
}

const refreshAccessToken = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const user_id = req.user?.user_id

        const newAccessToken = generateAccessToken(user_id);


        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });

        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: ms('10m')
        })

        return res.status(200).json({
            success: true,
            message: "Token refreshed successfully"
        })
    } catch (err) {
        next(err)
    }
}

export = {
    register,
    verifyUser,
    login,
    logout,
    requestPasswordReset,
    resetPassword,
    refreshAccessToken
}

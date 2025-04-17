import redis from "../utils/redis"
import { encryptPassword, comparePasswords } from "../utils/bcrypt";
import { generateAccessToken, generateRefreshToken, verifyAccessToken } from "../utils/jwt";
import { authQueries } from "../config/db_queries/auth_queries";
import userQueries from "../config/db_queries/user_queries";
import sendPasswordResetEmail from "../config/resetEmailConfig";
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { loginSchema, registerSchema, forgotPasswordSchema, resetPasswordSchema } from "../schemas/user_schema";
;


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

        const existingUser = await authQueries.getUserDetails(email);

        if (existingUser) return res.status(400).json({ 
            success: false,
            error: "This email is already registered" 
        });
        

        const encryptedPassword = await encryptPassword(password);

        const results = await authQueries.createUser(
            name,
            email,
            encryptedPassword
        );

        if (!results) return res.status(500).json({
                success: false,
                error: "Error creating user"
        })

        const user_id = results.user_id;

        const accessToken = generateAccessToken(user_id);
        const refreshToken = generateRefreshToken(user_id);

         res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: "/api/refresh-token"
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
            path: "/api/refresh-token"
        })

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })

        res.status(201).json({
            success: true,
            message: "User registered successfully!",
            user: {
                user_id: user_id,
                name: results.name,
                email: results.email
            },
        })

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

        const user = await authQueries.getUserDetails(email);

        if (!user) return res.status(404).json({ 
            success: false,
            error: "User not found. Please register or confirm your details" 
        })
        

 
        const storedHashedPassword = user.password;
        const user_id = user.user_id;
        const name = user.name;

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
            path: "/api/refresh-token"
        })

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })

        res.status(201).json({
            success: true,
            message: "User login successful!",
            user: {
                user_id: user_id,
                name,
                email
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

        const user = await authQueries.getUserDetails(email);

        if (!user) return res.status(404).json({
            success: false,
            error: "User not found"
        });

        const resetToken = generateAccessToken(user.user_id);


        await sendPasswordResetEmail(user.email, resetToken);

        res.clearCookie('resetToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })

        res.cookie('resetToken', resetToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })

        res.status(200).json({
            success: true,
            message: "Password reset email sent.",
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

        const resetToken = req.cookies['resetToken'];

        if (!resetToken) return res.status(401).json({
            success: false,
            error: "No reset token provided. Go back to forgot password"
        })

        const {password: newPassword} = value.data;

        const verified = verifyAccessToken(resetToken) as JwtPayload;

        if (!verified) return res.status(401).json({
            error: "Reset Token not verified. Try again"
        })
        
        const user = await userQueries.getUserAfterAuth(verified.user_id);


  
        const currentPassword = user.password;

        const match = await comparePasswords(newPassword, currentPassword);

        if (match) return res.status(400).json({
            success: false,
            error: "Passwords must not match. change it for better security."
        })


        const encryptedPassword = await encryptPassword(newPassword);
        
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

        res.clearCookie("resetToken", {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
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
            sameSite: 'none'
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
    login,
    logout,
    requestPasswordReset,
    resetPassword,
    refreshAccessToken
}

require("dotenv").config();

export const env = {
    PORT: process.env.PORT,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXP: process.env.ACCESS_TOKEN_EXP,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXP: process.env.REFRESH_TOKEN_EXP,
    RESET_TOKEN_SECRET: process.env.RESET_TOKEN_SECRET,
    RESET_TOKEN_EXP: process.env.RESET_TOKEN_EXP,
    VERIFICATION_TOKEN_SECRET: process.env.VERIFICATION_TOKEN_SECRET,
    VERIFICATION_TOKEN_EXP: process.env.VERIFICATION_TOKEN_EXP,
    DB_URL: process.env.DB_URL, 
    CLOUD_NAME: process.env.CLOUD_NAME,
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET,
    REDIS_URL: process.env.REDIS_URL,
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    EMAIL_PORT: process.env.EMAIL_PORT,
    EMAIL_SECURE: process.env.EMAIL_SECURE,
    EMAIL_SERVICE: process.env.EMAIL_SERVICE,
}

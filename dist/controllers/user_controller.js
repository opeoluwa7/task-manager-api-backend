"use strict";
const userQueries = require("../config/db/user_queries.js");
const { authSchema } = require("../utils/joi_validation.js");
const { encryptPassword } = require("../utils/bcrypt.js");
const { generateAccessToken } = require("../utils/jwt.js");
const findUser = async (req, res, next) => {
    try {
        const user_id = req.user.user_id;
        const user = await userQueries.getUserAfterAuth(user_id);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        }
        res.status(200).json({
            success: true,
            user: {
                user_id: user.user_id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch (error) {
        next(error);
    }
};
const updateUser = async (req, res, next) => {
    try {
        const user_id = req.user.user_id;
        const { error, value } = authSchema.validate(req.body, { convert: true });
        if (error)
            return res.status(400).json({
                success: false,
                error: error.details[0].message
            });
        const { email: newEmail, password: newPassword, name: newName } = value;
        const user = await userQueries.getUserAfterAuth(user_id);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        }
        const currentEmail = user.email;
        const currentPassword = user.password;
        let newToken;
        if (newEmail && newEmail !== currentEmail) {
            newToken = generateAccessToken(newEmail, user_id);
        }
        let encryptedPassword = newPassword ? await encryptPassword(newPassword) : currentPassword;
        const results = await userQueries.updateUser(newName, newEmail, encryptedPassword, user_id);
        delete results.password;
        res.status(200).json({
            success: true,
            updatedUser: results,
            token: newToken
        });
    }
    catch (error) {
        next(error);
    }
};
const deleteUser = async (req, res, next) => {
    try {
        const user_id = req.user.user_id;
        const result = await userQueries.deleteUser(user_id);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    }
    catch (error) {
        next(error);
    }
};
module.exports = {
    findUser,
    updateUser,
    deleteUser
};

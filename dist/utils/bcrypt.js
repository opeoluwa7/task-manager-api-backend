"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswords = exports.encryptPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const encryptPassword = async (password) => {
    try {
        const salt = 10;
        const encryptedPassword = await bcrypt_1.default.hash(password, salt);
        return encryptedPassword;
    }
    catch (error) {
        console.error("Error hashing password:", error);
        throw error;
    }
};
exports.encryptPassword = encryptPassword;
const comparePasswords = async (inputPassword, storedHashedPassword) => {
    try {
        const match = await bcrypt_1.default.compare(inputPassword, storedHashedPassword);
        return match;
    }
    catch (error) {
        console.error("Passwords don\'t match:", error);
        throw error;
    }
};
exports.comparePasswords = comparePasswords;

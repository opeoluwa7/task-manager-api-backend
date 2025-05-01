"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchPasswords = exports.encryptedPassword = void 0;
const bcrypt_1 = require("../bcrypt");
const encryptedPassword = async (password) => {
    const result = await (0, bcrypt_1.encryptPassword)(password);
    return result;
};
exports.encryptedPassword = encryptedPassword;
const matchPasswords = async (password, storedHashedPassword) => {
    const result = await (0, bcrypt_1.comparePasswords)(password, storedHashedPassword);
    return result;
};
exports.matchPasswords = matchPasswords;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userQueries_1 = __importDefault(require("../../config/db_queries/userQueries"));
const createUser = async (name, email, password, isVerified) => {
    const result = await userQueries_1.default.createUser(name, email, password, isVerified);
    return result;
};
const checkUserWithEmail = async (email) => {
    const result = await userQueries_1.default.getUserWithEmail(email);
    return result;
};
const checkUserWithId = async (user_id) => {
    const result = await userQueries_1.default.getUserWithId(user_id);
    return result;
};
const updateUserInfo = async (name, email, password, user_id) => {
    const result = await userQueries_1.default.updateUser(name, email, password, user_id);
    return result;
};
const deleteUserInfo = async (user_id) => {
    const result = await userQueries_1.default.deleteUser(user_id);
    return result;
};
const userFn = {
    createUser,
    checkUserWithEmail,
    checkUserWithId,
    updateUserInfo,
    deleteUserInfo
};
exports.default = userFn;

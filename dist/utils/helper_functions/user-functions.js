"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userQueries_1 = __importDefault(require("../../config/db_queries/userQueries"));
const createUser = async (data) => {
    const result = await userQueries_1.default.createUser(data);
    return result;
};
const checkUserWithEmail = async (data) => {
    const result = await userQueries_1.default.getUserWithEmail(data);
    return result;
};
const checkUserWithId = async (data) => {
    const result = await userQueries_1.default.getUserWithId(data);
    return result;
};
const updateUserInfo = async (data) => {
    const result = await userQueries_1.default.updateUser(data);
    return result;
};
const deleteUserInfo = async (data) => {
    const result = await userQueries_1.default.deleteUser(data);
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

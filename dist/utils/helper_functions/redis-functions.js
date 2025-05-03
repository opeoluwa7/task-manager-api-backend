"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFromRedis = exports.checkRedisBlacklist = exports.blacklistToken = exports.storeTempInRedis = void 0;
const redis_1 = __importDefault(require("../redis"));
const tenMins = 600;
const storeTempInRedis = async (key, value) => {
    try {
        const storedValue = await redis_1.default.setex(key, tenMins, value);
        return storedValue;
    }
    catch (error) {
        throw error;
    }
};
exports.storeTempInRedis = storeTempInRedis;
const blacklistToken = async (key) => {
    try {
        const result = await redis_1.default.setex(key, tenMins, "blacklist");
        return result;
    }
    catch (error) {
        throw error;
    }
};
exports.blacklistToken = blacklistToken;
const checkRedisBlacklist = async (key) => {
    try {
        const result = await redis_1.default.get(key);
        return result;
    }
    catch (error) {
        throw error;
    }
};
exports.checkRedisBlacklist = checkRedisBlacklist;
const getFromRedis = async (key) => {
    try {
        const value = await redis_1.default.get(key);
        if (!value)
            return new Error("No resource found in redis").toString();
        return value;
    }
    catch (error) {
        throw error;
    }
};
exports.getFromRedis = getFromRedis;

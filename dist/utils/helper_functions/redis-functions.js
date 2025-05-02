"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFromRedis = exports.storeTempInRedis = void 0;
const redis_1 = __importDefault(require("../redis"));
const storeTempInRedis = async (key, value) => {
    try {
        const storedValue = await redis_1.default.setex(key, 600, value);
        return storedValue;
    }
    catch (error) {
        throw error;
    }
};
exports.storeTempInRedis = storeTempInRedis;
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

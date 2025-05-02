"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFromRedis = exports.blacklistToken = exports.storeTempInRedis = void 0;
//import { RedisKey } from "ioredis";
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
        const blacklist = await redis_1.default.setex(key, "3d", "blacklisted");
        return blacklist;
    }
    catch (error) {
        throw error;
    }
};
exports.blacklistToken = blacklistToken;
const getFromRedis = async (key) => {
    try {
        const value = await redis_1.default.get(key);
        if (!value)
            return new Error("No resource found").toString();
        return value;
    }
    catch (error) {
        throw error;
    }
};
exports.getFromRedis = getFromRedis;


import  { RedisKey } from "ioredis";
import redis from "../redis";

const tenMins = 600

export const storeTempInRedis = async(key: RedisKey, value: string) => {
    try {
        const storedValue = await redis.setex(key, tenMins, value);

        return storedValue
    } catch (error) {
        throw error
    }
}

export const blacklistToken = async (key: RedisKey) => {
    try {
        const result = await redis.setex(key, tenMins, "blacklist")

        return result
    } catch (error) {
        throw error
    }
}

export const checkRedisBlacklist = async (key: string) => {
    try {
        const result = await redis.get(key)

        return result
    } catch (error) {
        throw error
    }
} 

export const getFromRedis = async(key: string) => {
    try {
        const value = await redis.get(key);

        if (!value) return new Error("No resource found in redis").toString()

        return value
    } catch (error) {   
        throw error
    }
}


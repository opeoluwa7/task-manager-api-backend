
import { RedisKey } from "ioredis";
import redis from "../redis";



export const storeTempInRedis = async(key: string, value: string) => {
    try {
        const storedValue = await redis.setex(key, 600, value);

        return storedValue
    } catch (error) {
        throw error
    }
}

export const blacklistToken = async (key: RedisKey) => {
    try {
        const blacklist = await redis.setex(key, 60, "blacklisted")

        return blacklist
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


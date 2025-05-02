//import { RedisKey } from "ioredis";
import redis from "../redis";


const tenMins = 600;

export const storeTempInRedis = async(key: string, value: string) => {
    try {
        const storedValue = await redis.setex(key, tenMins, value);

        return storedValue
    } catch (error) {
        throw error
    }
}

export const blacklistToken = async (key: string) => {
    try {
        const blacklist = await redis.setex(key, "3d", "blacklisted")

        return blacklist
    } catch (error) {
        throw error
    }
}

export const getFromRedis = async(key: string): Promise<string> => {
    try {
        const value = await redis.get(key);

        if (!value) return new Error("No resource found").toString()

        return value
    } catch (error) {   
        throw error
    }
}


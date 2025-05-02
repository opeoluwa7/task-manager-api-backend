
import  { RedisKey } from "ioredis";
import redis from "../redis";



export const storeTempInRedis = async(key: RedisKey, value: string) => {
    try {
        const storedValue = await redis.setex(key, 600, value);

        return storedValue
    } catch (error) {
        throw error
    }
}

export const getFromRedis = async(key: RedisKey) => {
    try {
        const value = await redis.get(key);

        if (!value) return new Error("No resource found in redis").toString()

        return value
    } catch (error) {   
        throw error
    }
}


import Redis from "ioredis";
import { env } from "../config/env";


const redis = new Redis(env.REDIS_URL!); 

redis.on('connect', () => {
    console.log('Successfully connected to redis');
})

redis.on('error', (err) => {
    console.error('Redis error:', err);
})

export default redis;

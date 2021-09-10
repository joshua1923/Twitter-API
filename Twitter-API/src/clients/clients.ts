import Redis from 'redis';
import Twit from 'twit';

export default class Clients {

    // Redis Client
    getRedisClient = () => {
        const client = Redis.createClient({
            port: parseInt(process.env.REDIS_PORT),
            host: process.env.REDIS_ENDPOINT,
            password: process.env.REDIS_PASSWORD
        });

        return client;
    }

    // Twitter Client
    getTwitterClient = () => {
        const twitterClient = new Twit({
            consumer_key: process.env.API_KEY,
            consumer_secret: process.env.API_KEY_SECRET,
            access_token: process.env.ACCESS_TOKEN,
            access_token_secret: process.env.ACCESS_TOKEN_SECRET
        });

        return twitterClient;
    }
}
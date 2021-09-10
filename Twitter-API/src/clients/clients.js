"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = __importDefault(require("redis"));
const twit_1 = __importDefault(require("twit"));
class Clients {
    constructor() {
        // Redis Client
        this.getRedisClient = () => {
            const client = redis_1.default.createClient({
                port: parseInt(process.env.REDIS_PORT),
                host: process.env.REDIS_ENDPOINT,
                password: process.env.REDIS_PASSWORD
            });
            return client;
        };
        // Twitter Client
        this.getTwitterClient = () => {
            const twitterClient = new twit_1.default({
                consumer_key: process.env.API_KEY,
                consumer_secret: process.env.API_KEY_SECRET,
                access_token: process.env.ACCESS_TOKEN,
                access_token_secret: process.env.ACCESS_TOKEN_SECRET
            });
            return twitterClient;
        };
    }
}
exports.default = Clients;
//# sourceMappingURL=clients.js.map
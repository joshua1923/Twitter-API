"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twit_1 = __importDefault(require("twit"));
class TwitterClient {
    constructor() {
        this.getTwitterClient = () => {
            const twitterClient = new twit_1.default({
                consumer_key: process.env.API_KEY,
                consumer_secret: process.env.API_KEY_SECRET,
                access_token: process.env.ACCESS_TOKEN,
                access_token_secret: process.env.ACCESS_TOKEN_SECRET,
                app_only_auth: true
            });
            return twitterClient;
        };
    }
}
exports.default = TwitterClient;
//# sourceMappingURL=twitter.js.map
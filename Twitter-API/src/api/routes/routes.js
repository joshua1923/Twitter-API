"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clients_1 = __importDefault(require("../../clients/clients"));
const tweet_1 = __importDefault(require("../../models/tweet"));
const helpers_1 = require("../../helpers/helpers");
class Routes {
    constructor() {
        this.loadRoutes = (app) => {
            app.get('/tweets/:hashtag', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const hashtag = req.params.hashtag;
                const clients = new clients_1.default();
                const twitterClient = clients.getTwitterClient();
                const redisClient = clients.getRedisClient();
                let dataArray = [];
                let includesArray = [];
                let response = [];
                try {
                    yield redisClient.get(hashtag, (err, tweets) => __awaiter(this, void 0, void 0, function* () {
                        if (err)
                            throw err;
                        // If redis has tweets stored, return as JSON.
                        if (tweets)
                            return res.status(200).send(JSON.parse(tweets));
                        try {
                            yield twitterClient
                                .get(`${process.env.TWITTER_API_ENDPOINT}&query=%23${hashtag}`)
                                .then(res => {
                                // Assign response data to new objects and push each item into seperate arrays. 
                                // This was required due to the response from twit not allowing access to the data.
                                let dataObject = res.data;
                                dataObject.data.forEach(item => {
                                    dataArray.push(item);
                                });
                                let includesObject = res.data["includes"];
                                includesObject.users.forEach(item => {
                                    includesArray.push(item);
                                });
                            });
                            // Merge the 2 data arrays together to produce a similar result to a SQL join.
                            let result = (0, helpers_1.mergeTweetArrayObjects)(dataArray, includesArray);
                            // Iterate through result and push new Tweet into an array.
                            // This is so it can be returned with the names stated in the requirement.
                            result.forEach(item => {
                                response.push(new tweet_1.default(item.id, item.text, item.public_metrics.retweet_count, item.username, item.name, item.created_at, item.public_metrics.like_count));
                            });
                            // Update Redis with data pulled from twitter.
                            redisClient.setex(hashtag, 600, JSON.stringify(response));
                            return res.status(200).send(response);
                        }
                        catch (e) {
                            res.status(500).send(e.message);
                        }
                    }));
                }
                catch (e) {
                    res.status(500).send(e.message);
                }
            }));
        };
    }
}
exports.default = Routes;
//# sourceMappingURL=routes.js.map
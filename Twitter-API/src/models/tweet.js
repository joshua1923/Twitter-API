"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Tweet {
    constructor(tweetId, text, retweetCount, userName, userScreenName, date, likes) {
        this.tweetId = tweetId;
        this.text = text;
        this.retweetCount = retweetCount;
        this.userName = userName;
        this.userScreenName = userScreenName;
        this.date = date;
        this.likes = likes;
    }
}
exports.default = Tweet;
//# sourceMappingURL=tweet.js.map
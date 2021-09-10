export default class Tweet {
    constructor(
        public tweetId: number,
        public text: string,
        public retweetCount: number,
        public userName: string,
        public userScreenName: string,
        public date: Date,
        public likes: number
    ) { }
}
import { Application, Request, Response } from "express";
import Clients from "../../clients/clients";
import Tweet from "../../models/tweet";
import { mergeTweetArrayObjects } from "../../helpers/helpers";

export default class Routes {
    loadRoutes = (app: Application) => {
        app.get('/tweets/:hashtag', async (req: Request, res: Response) => {

            const hashtag = req.params.hashtag;
            const clients: Clients = new Clients();
            const twitterClient = clients.getTwitterClient();
            const redisClient = clients.getRedisClient();

            let dataArray: any = [];
            let includesArray: any = [];
            let response: any = [];

            try {
                await redisClient.get(hashtag, async (err, tweets) => {
                    if (err) throw err;

                    // If redis has tweets stored, return as JSON.
                    if (tweets) return res.status(200).send(JSON.parse(tweets));

                    try {
                         await twitterClient
                                .get(`${process.env.TWITTER_API_ENDPOINT}&query=%23${hashtag}`)
                             .then(res => {
                                    // Assign response data to new objects and push each item into seperate arrays. 
                                    // This was required due to the response from twit not allowing access to the data.
                                    let dataObject: any = res.data;
                                    dataObject.data.forEach(item => {
                                        dataArray.push(item);
                                    });

                                    let includesObject: any = res.data["includes"];
                                    includesObject.users.forEach(item => {
                                        includesArray.push(item);
                                    });
                                });

                            // Merge the 2 data arrays together to produce a similar result to a SQL join.
                            let result = mergeTweetArrayObjects(dataArray, includesArray);

                            // Iterate through result and push new Tweet into an array.
                            // This is so it can be returned with the names stated in the requirement.
                            result.forEach(item => {
                                response.push(
                                    new Tweet(
                                        item.id,
                                        item.text,
                                        item.public_metrics.retweet_count,
                                        item.username,
                                        item.name,
                                        item.created_at,
                                        item.public_metrics.like_count
                                    )
                                );
                            });

                            // Update Redis with data pulled from twitter.
                            redisClient.setex(hashtag, 600, JSON.stringify(response));

                            return res.status(200).send(response);
                        } catch (e) {
                            res.status(500).send(e.message);
                        }
                });
            } catch (e) {
                res.status(500).send(e.message);
            }
        });
    };
}
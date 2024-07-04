import gplay from 'google-play-scraper';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

const port = process.env.PORT || 3001;


app.get('/', async (req, res) => {
    try {
        const appIds = req.query.appIds.split(',');
        const appDetailsPromises = appIds.map(appId => gplay.app({ appId }));
        const appDetailsArray = await Promise.all(appDetailsPromises);

        const installs = appDetailsArray.map(appDetails => ({
            appId: appDetails.appId,
            installs: appDetails.installs,
            genre: appDetails.genre,
            contentRating:appDetails.contentRating // Include rating in response
        }));

        console.log(installs); // Debugging: log the response

        res.json(installs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => console.log(`Listening to port ${port}`));

export default app;


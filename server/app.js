
import 'dotenv/config';
import express from 'express';
import {
    MongoClient,
    ServerApiVersion
} from 'mongodb';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.static(join(__dirname, '../public')));

const uri = process.env.MONGO_URI;

if (!uri) {
    throw new Error('MONGO_URI is missing from .env');
}

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

async function connectMongo() {
    await client.connect();
    await client.db('admin').command({ ping: 1 });

    console.log('🏓 pinged MongoDB. connected!');

    app.locals.db = client.db('marvel_game');
}

// Serve the Marvel game.
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, '../public/index.html'));
});

// Retrieve the current high score.
app.get('/api/highscore', async (req, res) => {
    try {
        const highScore = await app.locals.db
            .collection('highscores')
            .findOne({ _id: 'marvel-higher-lower' });

        res.json({
            highScore: highScore ? highScore.score : 0
        });
    } catch (error) {
        console.error('Error fetching high score:', error.message);
        res.status(500).json({
            error: 'Failed to fetch high score'
        });
    }
});

// Update the high score only when a new score is higher.
app.post('/api/highscore', async (req, res) => {
    try {
        const score = req.body.score;

        if (!Number.isInteger(score) || score < 0) {
            return res.status(400).json({
                error: 'Score must be a non-negative integer'
            });
        }

        const result = await app.locals.db
            .collection('highscores')
            .updateOne(
                {
                    _id: 'marvel-higher-lower',
                    score: { $lt: score }
                },
                {
                    $set: { score }
                }
            );

        if (result.matchedCount === 0 && result.upsertedCount === 0) {
            const existing = await app.locals.db
                .collection('highscores')
                .findOne({ _id: 'marvel-higher-lower' });

            if (!existing) {
                await app.locals.db
                    .collection('highscores')
                    .insertOne({
                        _id: 'marvel-higher-lower',
                        score
                    });
            }
        }

        const highScore = await app.locals.db
            .collection('highscores')
            .findOne({ _id: 'marvel-higher-lower' });

        res.json({
            highScore: highScore.score
        });
    } catch (error) {
        console.error('Error updating high score:', error.message);
        res.status(500).json({
            error: 'Failed to update high score'
        });
    }
});

async function startServer() {
    try {
        await connectMongo();

        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000');
        });
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        await client.close().catch(() => {});
        process.exit(1);
    }
}

startServer();

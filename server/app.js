
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

  app.locals.db = client.db('hotel');
}

// Professor's homepage route, adjusted to serve hotel.html.
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '../public/hotel.html'));
});

app.get('/whatever', (req, res) => {
  res.send('Hello World whatever autochange');
});

// Read all hotel records.
app.get('/api/hotels', async (req, res) => {
  try {
    const hotels = await app.locals.db
      .collection('hotels')
      .find({})
      .toArray();

    res.json(hotels);
  } catch (error) {
    console.error('Error fetching hotels:', error.message);
    res.status(500).json({ error: 'Failed to fetch hotels' });
  }
});

// Professor's "Read All" endpoint.
app.get('/api/items', async (req, res) => {
  try {
    const items = await app.locals.db
      .collection('items')
      .find({})
      .toArray();

    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error.message);
    res.status(500).json({ error: 'Failed to fetch items' });
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

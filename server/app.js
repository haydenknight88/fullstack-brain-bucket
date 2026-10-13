
import 'dotenv/config';
import express from 'express';
import {
  MongoClient,
  ServerApiVersion,
  ObjectId
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

// Issue 8: Get all items, optionally filtered by category.
app.get('/api/items', async (req, res) => {
  try {
    const category = req.query.category;
    const filter = category ? { category } : {};

    const items = await app.locals.db
      .collection('items')
      .find(filter)
      .toArray();

    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error.message);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// Issue 9: Get one item by its MongoDB ID.
app.get('/api/items/:id', async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        error: 'Invalid item ID'
      });
    }

    const item = await app.locals.db
      .collection('items')
      .findOne({ _id: new ObjectId(id) });

    if (!item) {
      return res.status(404).json({
        error: 'Item not found'
      });
    }

    res.json(item);
  } catch (error) {
    console.error('Error fetching item:', error.message);
    res.status(500).json({ error: 'Failed to fetch item' });
  }
});

// Issue 11: Create a new item.
app.post('/api/items', async (req, res) => {
  try {
    const result = await app.locals.db
      .collection('items')
      .insertOne(req.body);

    res.status(201).json({
      message: 'Item created successfully',
      _id: result.insertedId,
      ...req.body
    });
  } catch (error) {
    console.error('Error creating item:', error.message);
    res.status(500).json({ error: 'Failed to create item' });
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

// Issue 12: Update an item's category.
app.patch('/api/items/:id', async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        error: 'Invalid item ID'
      });
    }

    const changes = req.body;

    const result = await app.locals.db
      .collection('items')
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: changes }
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        error: 'Item not found'
      });
    }

    res.json(result);
  } catch (error) {
    console.error('Error updating item:', error.message);
    res.status(500).json({
      error: 'Failed to update item'
    });
  }

  
});


 // Issue 13: Delete an item by ID.
app.delete('/api/items/:id', async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        error: 'Invalid item ID'
      });
    }

    const result = await app.locals.db
      .collection('items')
      .deleteOne({
        _id: new ObjectId(id)
      });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        error: 'Item not found'
      });
    }

    res.json(result);
  } catch (error) {
    console.error('Error deleting item:', error.message);
    res.status(500).json({
      error: 'Failed to delete item'
    });
  }
});


startServer();

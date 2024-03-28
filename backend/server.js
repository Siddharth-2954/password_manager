const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

// MongoDB connection details
const url = 'mongodb://localhost:27017';
const dbName = 'passop';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if connection fails
  }
}

// Middleware to parse JSON request bodies
app.use(express.json());

// Get all passwords
app.get('/', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection('documents');
    const passwords = await collection.find({}).toArray();
    res.json(passwords);
  } catch (error) {
    console.error('Error fetching passwords:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Save password
app.post('/', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection('documents');
    await collection.insertOne(req.body);
    res.status(201).json({ message: 'Password saved successfully' });
  } catch (error) {
    console.error('Error saving password:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Delete a password
app.delete('/:id', async (req, res) => {
    try {
      const db = client.db(dbName);
      const collection = db.collection('documents');
      const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
      if (result.deletedCount === 1) {
        res.json({ message: 'Password deleted successfully' });
      } else {
        res.status(404).json({ error: 'Password not found' });
      }
    } catch (error) {
      console.error('Error deleting password:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Start the server
async function startServer() {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

startServer();

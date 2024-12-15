import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI; // Store your MongoDB URI in an environment variable
let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default async function connectToDatabase() {
  const client = await clientPromise;
  return client.db(); // Specify the database name here if needed
}
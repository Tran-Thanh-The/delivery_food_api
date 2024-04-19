import { MongoClient } from "mongodb";

let dbInstance = null;

const USER_NAME = 'tranthe_02';
const PASSWORD = 'oktauyen191102';
const MONGODB_URI = `mongodb+srv://${USER_NAME}:${PASSWORD}@cluster0.rgvw0.mongodb.net?retryWrites=true&w=majority&appName=Cluster0`;
const DATABASE_NAME = 'delivery_food';

export const connectDB = async () => {
  const client = new MongoClient(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  // connect
  await client.connect();

  // Assign clientDB to dbInstance
  dbInstance = client.db(DATABASE_NAME);
}

// get Database Instance
export const getDB = () => {
  if (!dbInstance) throw new Error('Must connect Database first!');
  return dbInstance;
}

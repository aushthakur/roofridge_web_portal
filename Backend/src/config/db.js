const mongoose = require('mongoose');
const seedInitialData = require('./seedData');

let mongodInstance = null;
let isEphemeral = false;

const connectDB = async () => {
  const isProduction = process.env.NODE_ENV === 'production';

  // Option 1: Try Remote Atlas URI if provided
  if (process.env.MONGO_URI) {
    try {
      console.log('[Database] Connecting to MongoDB Atlas cluster...');
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 3500, // Quick timeout if IP is not whitelisted
      });
      console.log(`[Database] MongoDB Atlas Connected: ${conn.connection.host}`);
      isEphemeral = false;
      await seedInitialData();
      return;
    } catch (error) {
      console.warn(`[Database] Atlas connection unsuccessful (${error.message}).`);
      if (isProduction) {
        console.error(
          '[Database Fatal] Production mode strictly prohibits ephemeral in-memory database fallback. A valid persistent MongoDB connection is mandatory.'
        );
        throw new Error(`Production MongoDB connection failed: ${error.message}`);
      }
      console.warn('[Database] Activating local in-memory database engine for development/testing...');
    }
  } else if (isProduction) {
    console.error(
      '[Database Fatal] MONGO_URI is required in production. Ephemeral in-memory database fallback is strictly prohibited in production mode.'
    );
    throw new Error('MONGO_URI is required in production mode');
  }

  // Option 2: Strictly Development / Testing Fallback to MongoMemoryServer
  try {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    mongodInstance = await MongoMemoryServer.create();
    const uri = mongodInstance.getUri();

    const conn = await mongoose.connect(uri);
    isEphemeral = true;
    console.log(`[Database] Local In-Memory MongoDB running at: ${uri} (DEV / TESTING ONLY)`);
    await seedInitialData();
  } catch (memError) {
    console.error('[Database Fatal] Unable to initialize database engine:', memError.message);
    throw memError;
  }
};

connectDB.connectDB = connectDB;
connectDB.isEphemeralDatabase = () => isEphemeral;

module.exports = connectDB;

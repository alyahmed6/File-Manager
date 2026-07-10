import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("ERROR: MONGODB_URI environment variable is not set!");
  console.error("Available env vars:", Object.keys(process.env).filter(k => k.includes('MONGO') || k.includes('mongodb')));
  throw new Error("MONGODB_URI environment variable is not set");
}

if (!MONGODB_URI.startsWith("mongodb://") && !MONGODB_URI.startsWith("mongodb+srv://")) {
  console.error("ERROR: Invalid MongoDB URI format");
  console.error("MONGODB_URI value:", MONGODB_URI.substring(0, 50) + "...");
  throw new Error("Invalid MongoDB connection string format");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? { conn: null, promise: null };
global.mongooseCache = cached;

let connectionEventsAttached = false;

function isConnected(conn: typeof mongoose | null): boolean {
  return !!conn && conn.connection.readyState === 1;
}

if (!connectionEventsAttached) {
  mongoose.connection.on("disconnected", () => {
    cached.conn = null;
    cached.promise = null;
  });
  connectionEventsAttached = true;
}

export async function connectDB() {
  if (isConnected(cached.conn)) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI!, {
        bufferCommands: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
      })
      .then((conn) => {
        cached.conn = conn;
        return conn;
      })
      .catch((error) => {
        cached.promise = null;
        cached.conn = null;
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

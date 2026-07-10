import mongoose from "mongoose";

function getMongoUri(): string | null {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return null;
  }

  if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
    throw new Error("Invalid MongoDB connection string format");
  }

  return uri;
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

  const uri = getMongoUri();
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is not set");
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, {
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

import { MongoClient } from "mongodb";

declare global {
  var __mongoClientPromise__: Promise<MongoClient> | undefined;
}

function getClientPromise() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable.");
  }

  if (!global.__mongoClientPromise__) {
    global.__mongoClientPromise__ = new MongoClient(uri).connect();
  }

  return global.__mongoClientPromise__;
}

export default getClientPromise;

import { MongoClient, ServerApiVersion } from "mongodb"
 
if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}
 
const uri = process.env.MONGODB_URI
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
}
 
let client: MongoClient;
let clientPromise: Promise<MongoClient>;
if (process.env.NODE_ENV === "development") {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient;
  };
  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options);
    clientPromise = globalWithMongo._mongoClient.connect(); // Asigna el valor de clientPromise aquí
  } else {
    clientPromise = Promise.resolve(globalWithMongo._mongoClient); // Asigna el cliente existente a clientPromise
  }
  client = globalWithMongo._mongoClient;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect(); // Asigna el valor de clientPromise en producción
}
export default clientPromise;
import { MongoClient } from "mongodb";

// const uri = "mongodb://127.0.0.1:27017/Users";
const uri = process.env.MONGO_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

client = new MongoClient(uri!, options);
clientPromise = client.connect();

export default clientPromise;

import { MongoClient, ObjectId } from 'https://deno.land/x/mongo@v0.7.0/mod.ts';
import 'https://deno.land/x/dotenv/load.ts';

const MONGO_URI : string = Deno.env.get('MONGO_URI')!;
const DATA_BASE = Deno.env.get('MONGO_DATA_BASE')!;

const client = new MongoClient();
client.connectWithUri(MONGO_URI);

const db = client.database(DATA_BASE);

export { db, ObjectId };
import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectDB() {
    if (cached.conn) return cached.conn;
    mongoose.set("debug", true);
    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false, // disable mongoose buffering
        }).then((mongoose) => mongoose);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB;

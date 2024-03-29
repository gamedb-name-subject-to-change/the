import mongoose from 'mongoose'

const MONGODB_URI = process.env.MongoSecret

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .process.env.local'
  )
}
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect () {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
      console.log(mongoose.models)
      return mongoose
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect
import mongoose  from "mongoose";
import {config} from "../config/config.js"

async function connectDatabase() {
    const connOptions  = {
      useNewUrlParser : true,
      useUnifiedTopology: true
    }
  try {
    const conn = await mongoose.connect(config.mongodb, connOptions);
    if (conn) {
        console.log(`Connected To The ${conn.connection.host}`);
    }
  } catch (error) {
    console.log(error.message, error.stack);
  }
}

export { connectDatabase };
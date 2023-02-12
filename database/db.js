import mongoose, { mongo } from "mongoose";
import dotenv from 'dotenv';


dotenv.config();
const u = process.env.DB_USER;
const p = process.env.DB_PASSWORD;
const d = process.env.DB;
mongoose.set('strictQuery', true);
const Connection = () => {
    // const MONGODB_URL = `mongodb+srv://${u}:<${p}>@mern-todo.xjfnt2c.mongodb.net/?retryWrites=true&w=majority`;

    const MONGODB_URL = `${d}/todoDB`;
    mongoose.connect(MONGODB_URL, { useNewUrlParser: true });

    mongoose.connection.on('connected', () => {
        console.log('database connected');
    });

    mongoose.connection.on('disconnected', () => {
        console.log('database disconnected');
    });

    mongoose.connection.on('error', (error) => {
        console.log("error while connectind db ", error.message);
    })
}

export default Connection;  
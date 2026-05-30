import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const server = express();

server.use(express.json());
let PORT = 3000;

mongoose.connect(process.env.DB_LOCATION, {
    autoIndex: true
})

server.post("/signup", (req, res) => {
    res.json(req.body);
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
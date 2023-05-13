const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/";

const connectToMongo = () => {
    mongoose
        .connect("mongodb://127.0.0.1:27017/onNote")
        .then(() => console.log("MongoDB Connected"))
        .catch((err) => console.log("Mongo Error", err));
}

module.exports = connectToMongo;
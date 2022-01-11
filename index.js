import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// const authRoutes = require("./routes/authRoute");
// const requireAuth = require("./Authentication/requireAuth");

//routers
import buySellRouter from "./routes/buy_sell/products.js";

const app = express();
dotenv.config();

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(authRoutes);

const mongodb_uri = process.env.NODE_ENV
  ? process.env.MONGODB_URI
  : "mongodb+srv://Kolegia_User:Kolegia0987@cluster0.nbslt.mongodb.net/Kolegia"; //have to put in env

mongoose
  .connect(mongodb_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.error(err));

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});

app.use("/api/buysell", buySellRouter);

const port = process.env.NODE_ENV ? process.env.PORT : 8000;

app.listen(process.env.PORT || 8000);

console.log(`Listening to port ${port}`);

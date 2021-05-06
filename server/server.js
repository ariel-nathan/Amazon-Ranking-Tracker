import dotenv from "dotenv";
import express from "express";
import getItem from "./scraper.js";
import cron from "node-cron";
import { Item } from "./model.js";
import cors from "cors";
import moment from "moment";
import fetchData from "./fetcher.js";
import mongoose from "mongoose";

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 3030;

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(cors());

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});

app.get("/", (req, res) => {
  res.send(
    "Hello! to make a request add '/?asin={YOUR ASIN}' to the end of the url\nTo get get all records add '/items'\nTo get latest items add '/items-latest'"
  );
});

app.post("/", async (req, res) => {
  const asin = req.query.asin;
  const data = await getItem(asin);
  res.json(data);
});

app.get("/items", async (req, res) => {
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "Connection Error:"));
  db.once("open", () => console.log("Connected to DB"));

  const items = await Item.find({});
  res.json(items);
});

app.get("/items/:asin", async (req, res) => {
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "Connection Error:"));
  db.once("open", () => console.log("Connected to DB"));

  const items = await Item.find({ parent_asin: req.params["asin"] });
  res.json(items);
});

app.get("/items-latest", async (req, res) => {
  const today = moment().format("YYYY-MM-DD");
  const yesterday = moment().subtract(1, "days").toISOString();

  const items = await Item.find({ timestamp: { $gt: today } });

  if (items.length === 0) {
    const yesterdayItems = await Item.find({
      timestamp: { $gt: yesterday },
    });
    res.json(yesterdayItems);
  } else {
    res.json(items);
  }
});

console.log("Data pull will run every day at 12am");

cron.schedule("0 12 */1 * *", () => {
  console.log("Starting Data Pull");
  fetchData();
});

// fetchData();

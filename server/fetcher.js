import mongoose from "mongoose";
import dotenv from "dotenv";
import neatCSV from "neat-csv";
import fs from "fs";
import { Item } from "./model.js";
import axios from "axios";

dotenv.config();

const PORT = process.env.PORT || 3030;

const asinList = [];
const parentSKUList = [];

export default function fetchData() {
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "Connection Error:"));
  db.once("open", () => console.log("Connected to DB"));

  fs.readFile("./ParentAsins.csv", async (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const csv = await neatCSV(data);
    csv.forEach((row) => {
      const asin = row["ASIN"];
      const parentSKU = row["SKU"];
      asinList.push(asin);
      parentSKUList.push(parentSKU);
    });
    asinList.forEach((asin, index) => {
      setTimeout(async () => {
        try {
          console.log(`Processing ASIN ${asin}`);
          const data = await getASINData(asin);
          const item = new Item({
            parent_sku: parentSKUList[index],
            parent_asin: data.parentAsin,
            child_asin: data.childAsin,
            title: data.title,
            price: data.price,
            rank: data.ranking,
          });
          console.log(item);
          item.save((err) => {
            if (err) console.log(err);
            console.log("Inserted Record to DB");
          });
        } catch (err) {
          console.log(`Error: ${err}`);
          return;
        }
      }, 15000 * (index + 1));
    });
  });

  async function getASINData(asin) {
    const url = `http://localhost:${PORT}/?asin=${asin}`;
    console.log(url);
    const data = await axios
      .post(url)
      .then((res) => {
        // console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        // console.log(err);
        return err;
      });
    return data;
  }
}

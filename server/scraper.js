import axios from "axios";
import cheerio from "cheerio";

function cleanText(str, id) {
  const clean = str
    .text()
    .split("\n")
    .filter((item) => {
      return id !== "asin" ? item !== "" : item.startsWith("B");
    });
  return clean;
}

class Product {
  constructor(parentAsin, childAsin, title, price, ranking) {
    this.parentAsin = parentAsin;
    this.childAsin = childAsin;
    this.title = title;
    this.price = price;
    this.ranking = ranking;
  }
}

export default async function getItem(asin) {
  const url = `https://www.amazon.com/dp/${asin}`;
  const data = await axios(url)
    .then((response) => {
      const $ = cheerio.load(response.data);
      const childAsin = $(".prodDetTable > tbody > tr > td")
        ? cleanText($(".prodDetTable > tbody > tr > td"), "asin")
        : null;
      const title = $("#productTitle")
        ? cleanText($("#productTitle"), "title")
        : null;
      const price = $("#priceblock_ourprice")
        ? $("#priceblock_ourprice").text().slice(1)
        : null;
      const [ranking1, ranking2, ranking3] = $(
        ".prodDetTable > tbody > tr > td > span"
      )
        ? cleanText($(".prodDetTable > tbody > tr > td > span"), "rank").map(
            (rank) => {
              return rank.slice(1).replace(",", "");
            }
          )
        : null;
      const rank1 = ranking1.split(" in ")[0].replace(",", "");
      const cat1 = ranking1
        .split(" in ")[1]
        .slice(0, ranking1.split(" in ")[1].indexOf("(") - 1);
      const rank2 = ranking2
        ? ranking2.split(" in ")[0].replace(",", "")
        : null;
      const cat2 = ranking2 ? ranking2.split(" in ")[1] : null;
      const rank3 = ranking3
        ? ranking3.split(" in ")[0].replace(",", "")
        : null;
      const cat3 = ranking3 ? ranking3.split(" in ")[1] : null;

      const item = new Product(asin, childAsin[0], title[0], Number(price), [
        { rank: rank1 ? Number(rank1) : null, category: cat1 },
        { rank: rank2 ? Number(rank2) : null, category: cat2 },
        { rank: rank3 ? Number(rank3) : null, category: cat3 },
      ]);
      return item;
    })
    .catch((err) => {
      return err;
    });
  return data;
}

const { MongoClient } = require("mongodb");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "fruity";

function quickSort(list) {
  if (list.length < 2) return list;
  let pivot = list[0];
  let left = [];
  let right = [];
  for (let i = 1, total = list.length; i < total; i++) {
    if (list[i].name < pivot.name) left.push(list[i]);
    else right.push(list[i]);
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}

async function main() {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("fruits");
  const findResult = await collection.find({}).toArray();
  console.log("Found documents =>", findResult);
  return findResult;
}

app.get("/find", async (req, res) => {
  const result = await main();
  const sorted = quickSort(result);
  console.log("Sorted documents =>", sorted);
  res.send(sorted);
});

app.listen(4000);
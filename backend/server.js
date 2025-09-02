const express = require("express");
const app = express();
const port = 3000;
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");
dotenv.config();
app.use(cors());
app.use(bodyparser.json());
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "Ampass";
client.connect();
// Get all the password
// Get all saved passwords
app.get("/", async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection("Passwords");

    const allPasswords = await collection.find({}).toArray(); // get all docs
    res.json(allPasswords); // send array
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch passwords" });
  }
});

// Save all the password
app.post("/", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("Passwords");
  const password = req.body;
  const filteredDocs = await collection.insertOne(password);
  const allPasswords = await collection.find({}).toArray(); // get all docs
  res.send({ success: true, result: allPasswords });
});

app.delete("/passwords/:id", async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection("Passwords");
    const id = req.params.id;

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.json({ success: true, message: "Password deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Delete failed" });
  }
});
app.post("/passwords", async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection("Passwords");

    // Take client data but enforce isFavourite: false
    const password = {
      ...req.body,
      isFavourite: false, // ✅ Always added
    };
    const result = await collection.insertOne(password);

    res.json({ success: true, insertedId: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to insert" });
  }
});

// ✅ GET → get all passwords
app.get("/passwords", async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection("Passwords");

    const allPasswords = await collection.find({}).toArray();
    res.json(allPasswords);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch" });
  }
});
app.patch("/passwords/:id/favourite", async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection("Passwords");
    const id = req.params.id;

    const result = await collection.updateOne(
      { _id: new ObjectId(id) }, // ✅ must wrap in ObjectId
      [{ $set: { isFavourite: { $not: "$isFavourite" } } }] // ✅ toggle in MongoDB itself
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Password not found" });
    }

    // return updated doc
    const updated = await collection.findOne({ _id: new ObjectId(id) });
    res.json({ success: true, updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update failed" });
  }
});
app.put("/passwords/:id", async (req, res) => {
  const id = req.params.id.trim(); // remove whitespace
  console.log("PUT request ID:", id);
  console.log("Request body:", req.body);

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid ID" });
  }

  try {
    const updatedData = { ...req.body };
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, message: "Password not found" });
    }

    res.json({ success: true, updated: updatedData });
  } catch (err) {
    console.error("MongoDB update error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

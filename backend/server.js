const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;
const http = require("http").Server(express);
const authRoutes = require("./routes/auth");
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://ananyaverma13:44ZjvrfXc1Z5azDm@room-render-db.jpykqjv.mongodb.net/?retryWrites=true&w=majority&appName=room-render-db";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error("Failed to connect to MongoDB Atlas:", error);
  }
}

run().catch(console.dir);

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
app.use(express.json());

// MongoDB (safe fallback)
const MONGO = process.env.MONGODB_URI || "";

if (MONGO) {
  mongoose.connect(MONGO).catch(()=>{});
}

const Ram = mongoose.models.Ram || mongoose.model("Ram", new mongoose.Schema({
  name: String,
  price: String,
  image: String,
  description: String
}));

// API
app.get("/api/rams", async (req,res)=>{
  try{
    if(!MONGO) return res.json([]);
    const data = await Ram.find();
    res.json(data);
  }catch{
    res.json([]);
  }
});

// Serve frontend
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req,res)=>{
  res.sendFile(path.join(__dirname,"dist","index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log("Server running on", PORT));

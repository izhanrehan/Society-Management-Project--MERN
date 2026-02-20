// api/events.js
import mongoose from "mongoose";
import connectDB from "../utils/db.js";

export default async function handler(req, res) {
  await connectDB(); // connect to MongoDB
  if (req.method === "GET") {
    // fetch events
    res.status(200).json({ message: "Hello from Vercel Serverless!" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
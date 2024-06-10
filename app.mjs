import mongoose from "mongoose";
import "dotenv/config";
import routes from "./routes/routes.mjs";
import express from "express";

const app = express();
const PORT = 4444;

app.use("/api", routes);
app.use(express.json());
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("mongoose is connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

app.listen(PORT, () => {
  console.log("listening...");
});
connectDb();

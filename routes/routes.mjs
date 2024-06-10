import express from "express";
import mongooseSchema from "../models/model.mjs";
const Router = express.Router();
const app = express();
app.use(express.json());

Router.post("/post", async (req, res) => {
  console.log(req.body);
  try {
    const data = req.body;
    const newdata = new mongooseSchema(data);
    await newdata
      .save()
      .then((savedData) => {
        console.log(savedData);
        res.status(201).json({ msg: "data saved successfully" });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ msg: "could not save data in mongoose" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "an error occured" });
  }
});
export default Router;

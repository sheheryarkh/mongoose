import express, { request } from "express";
import mongooseSchema from "../models/model.mjs";
import Data from "../models/model.mjs";
const Router = express.Router();

Router.use(express.json());
// using post api to save data in mongoose
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
})
//get api to fetch datas from mongoose
Router.get("/datas", async(req,res)=>{
  const data = await Data.find()
  res.status(200).json(data)
});
// deleting one item using get api in mongoose
Router.get("/:id",async(req,res)=>{
  const id = await Data.findById(req.params.id)
  await Data.deleteOne(id)
  res.status(200).json({msg:"one item deleted successfully"})
})
// using patch to update datas in mongoose
Router.patch("/:id",async(req,res)=>{
  const body = await Data.findByIdAndUpdate({_id : req.params.id},{lastname : req.body.lastname})
  res.status(200).json({msg:"data updated successfully"})
})
//using delete to delete a particuler data 

Router.delete("/delete/:id",async(req,res)=>{
 try{
  const data = await Data.findByIdAndDelete({_id : req.params.id})
res.status(200).json({msg:"data deleted successfully"})}
catch(error){
  console.log("something went wrong")
}
})
//using put method to change/create a particuler data in mongoose

Router.put("/put/:id",async(req,res)=>{
  try{
    const body = await Data.updateOne({_id:req.params.id},
     { name:req.body.name,
      lastname:req.body.lastname,
      id:req.body.id
    })
    res.status(200).json(body)
  }catch(err){
res.status(500).json({message :"something went wrong"})
  }

})


export default Router;

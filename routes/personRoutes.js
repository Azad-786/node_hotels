const express = require("express");
const router = express.Router();
const Person = require('../models/person');

// post data through person endpoint
router.post('/', async(req, res) =>{
     try{
         const data = req.body;
         const newPerson = new Person(data);
         const response = await newPerson.save();
         console.log("\x1b[32m%s\x1b[0m", "data sent successfully")
         res.status(200).json(response)
 
     }
     catch(error){
         console.log(error);
         res.status(500).json({error: "Internal server error"})
     }
 })
 

 //get data from database
 router.get("/", async(req, res) =>{
     try{
      const data = await Person.find();
      console.log("Data fetched successfully");
      res.status(200).json(data);
     }
     catch(error){
  console.log({error:  "Internal server error"});
     }
 })
 
 
 // get data by workType
 router.get("/:workType", async(req, res)=> {
     try{
    const workType = req.params.workType;
 
    if(workType==="chef" || workType==="manager" || workType==="waiter"){
     const response = await Person.find({work: workType});
     console.log("data fetched successfully");
     res.status(200).json(response)
    }
    else{
     res.status(404).json({error: "data not found"})
    }
     }
     catch(error){
         console.log(error)
         res.status(500).json({error: "Internal server error"});
     }
 })

//  update data in person endpoint api
 router.put('/:id', async(req, res) =>{
    try{
 const personId = req.params.id;
 const updatedPersondata = req.body;

 const response = await Person.findByIdAndUpdate(personId, updatedPersondata, {
    new: true,
    runValidators: true
 })

 if(!response){
    res.status(404).json({data: "details not updated"});
 }

 res.status(200).json(response);
    }
    catch(error){
        console.log(error);
        res.status(500).json({error: "Internal server error"});
    }
 })


 router.delete("/:id", async(req, res) =>{
    try{
     const personId = req.params.id;
     const response = await Person.findByIdAndDelete(personId);
     res.status(200).json(response);
     if(!response){
        res.status(404).json({error: "Person not found"})
     }
     console.log("data deleted");
     res.status(200).json({message: "person deleted Successfully"})
    }
    catch(error){
        console.log(error)
        res.status(500).json({error: "Internal server error"});
    }
 })

 module.exports = router;
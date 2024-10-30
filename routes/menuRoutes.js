const express = require("express");
const router = express.Router();
const MenuItem = require('../models/MenuItem')


router.post("/", async(req, res) =>{
     try{
      const data = req.body;
      const newMenuItem = new MenuItem(data);
      const response = await newMenuItem.save();
      console.log("\x1b[32m%s\x1b[0m", "data sent successfully")
      res.status(200).json(response);
     
     }
     catch(error){
         console.log(error);
         res.status(500).json({error: "internal server error"})
     }
     })
     
     // get menu items from database
     router.get('/', async(req, res) => {
      try{
      const data = await MenuItem.find();
     console.log("data fetched successfully");
     res.status(200).json(data);
     }
     catch(error){
         res.status(500).json({error: "internal server error"})
      }
})

// get data on the basis of taste 
router.get("/:tasteType", async(req, res) =>{
     try{
        const tasteType = req.params.tasteType;

        if(tasteType == "sweet" || tasteType == "sour" || tasteType == "spicy"){
          const  response = await MenuItem.find({taste:tasteType});
          res.status(200).json(response)
        }
        else{
          res.status(404).json({error: "data not found"})
        }

     }
     catch(error){
          console.log(error);
          res.status(500).json({data: "Internal server error"});
     }
})

// update data by id

router.put("/:id", async(req, res) =>{
     try{
      const menuId = req.params.id;
      const updatedMenuItem = req.body;
      
      const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuItem, {
          new: true,
          runValidators: true
      })

      if(!response){
          res.status(404).json({msg: "data not found"})
      }

      res.status(200).json(response)
       
     }
     catch(error){
          console.log(error);
          res.status(500).json({error: "Internal server error"})
     }
})

// delete item by id

router.delete('/:id', async(req, res) =>{
     try{
        const menuId = req.params.id;
        const response = await MenuItem.findByIdAndDelete(menuId);
        res.status(200).json(response);
         
        if(!response){
          res.status(404).json({msg: "response not found"})
        }
        res.status(200).json({msg: "data deleted"});
        console.log("data deleted")
     }
     catch(error){
          console.log(error);
          res.status(500).json({error: "Internal server error"})
     }
})

module.exports = router;
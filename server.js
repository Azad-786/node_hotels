const express = require('express');
const db = require('./db'); 
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.json());


// import personRoutes
const personRoutes = require("./routes/personRoutes");
app.use('/person',  personRoutes);

// import menuRoutes
const menuRoutes = require("./routes/menuRoutes");
app.use("/menu",menuRoutes)



const port = 3000;
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})
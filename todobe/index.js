const port = 3000;
const express = require('express');
const app = express()
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://duong3456789:1111@cluster0.x76l8mw.mongodb.net/todoweb");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res)=>{
    res.send("Express app is running")
})

const Tasks = mongoose.model("Tasks", {
    name: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
})

app.get("/alltask", async(req, res) =>{
    let task = await Tasks.find({});
    res.send(task)
})

app.post('/addtask', async (req, res) => {
    const task = new Tasks({
        name: req.body.name,
        priority: req.body.priority,
        status: req.body.status
    })
    await task.save();
    res.json({
        success: true,
        name: req.body.name,
    })
})

app.listen(port,(error)=>{
    if(!error){
        console.log("Server is running on port "+ port);
    }else{
        console.log("Error"+ error);
    }
})
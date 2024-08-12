const express = require("express");
const rute = express.Router();
const inputRadio = require("../Models/2inputRadio");

rute.get("/inputRadio",async(req,res) => {
    try{
        const getData = await inputRadio.find();
        res.status(200).json(getData)
    }catch(err){
        res.status(500).json(err)
    }
})

rute.get("/inputRadio/:id",async(req,res) => {
    try{
        const Id = req.params.id
        const getData = await inputRadio.findById(Id);
        res.status(200).json(getData)
    }catch(err){
        res.status(500).json(err)
    }
})

rute.post("/inputRadio",async(req,res) => {
    try{
        const body = new inputRadio(req.body);
        const simpanData = await body.save();
        res.status(200).json(simpanData)
    }catch(err){
        res.status(500).json(err)
    }
})

rute.patch("/inputRadio/:id",async(req,res) => {
    try{
        const id = req.params.id;
        const body = req.body;

        //Set all radio buttons to not selected
        await inputRadio.updateMany({},{isSelected : false})

        //Update the selected radio button
        const updateData = await inputRadio.findByIdAndUpdate(id, {...body,isSelected : true },{new : true});
        res.status(200).json(updateData)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = rute;
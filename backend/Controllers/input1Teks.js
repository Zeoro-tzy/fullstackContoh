const express = require("express");
const rute = express.Router();
const inputTeks = require("../Models/1inputTeks");


rute.get("/inputTeks",async(req,res) => {
    try{
        const input = await inputTeks.find();
        res.status(200).json(input);
    }catch(err){
        res.status(404).json({message : "Data tidak ditemukan"})
    }
})

rute.get("/inputTeks/:id",async(req,res) => {
    try{
        const id = await inputTeks.findById(req.params.id);
        if(!id){
            res.status(404).json({message : "Data tidak ditemukan"})
        }
        res.status(200).json(id);
    }catch(err){
        res.status(500).json({message : "Server sedang bermasalah"})
    }
})


rute.post("/inputTeks",async(req,res) => {
    try{
        const body = new inputTeks(req.body);
        const saveData = await body.save();
        res.status(201).json(saveData);
    }catch(err){
        res.status(409).json({message : "Tidak bisa menambah data"})
    }
})


rute.patch("/inputTeks/:id",async(req,res) => {
    try{
        const id = req.params.id;
        const body = req.body;
        const updateData = await inputTeks.findByIdAndUpdate(id,body,{new : true});
        if(!updateData){
            res.status(404).json({message : "Data tidak ditemukan"})
        }
        res.status(200).json(updateData);
    }catch(err){
        res.status(500).json({message : "Server sedang bermasalah"})
    }
})

rute.delete("/inputTeks/:id",async(req,res) => {
    try{
        const id = req.params.id;
        const delData = await inputTeks.findByIdAndDelete(id);
        if(!delData){
            res.status(404).json({message : "Data tidak ditemukan"})
        }
        res.status(200).json({message : "data berhasil dihapus"})
    }catch(err){

    }
})

module.exports = rute;
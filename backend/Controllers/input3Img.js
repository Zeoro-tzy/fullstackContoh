const express = require("express")
const rute = express.Router();
const schemaImg = require("../Models/3inputImg");
const multer = require("multer");
const path = require("path")
const fs = require("fs") // untuk menghapus file dari sistem

//Konfigurasi Multer untuk upload file
const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,'uploadsGambar/');
    },
    filename : (req,file,cb) => {
        cb(null,Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage});


rute.post("/dataImg",upload.single('image'),async(req,res) => {
    try{
        const newImage = new schemaImg({
            filename : req.file.filename,
            path : req.file.path,
            originalname : req.file.originalname
        });
        await newImage.save()
        res.status(200).json(newImage);
    }catch(err){
        res.status(500).json(err)
    }
})


rute.get("/dataImg",async(req,res) => {
    try{
        const images = await schemaImg.find();
        res.status(200).json(images)
    }catch(err){
        res.status(500).json(err)
    }
})

rute.get("/dataImg/:id",async(req,res) => {
    try{
        const Id = req.params.id;
        const getData = await schemaImg.findById(Id);
        res.status(200).json(getData);
    }catch(err){
        res.status(500).json(err)
    }
})

rute.delete("/dataImg/:id",async(req,res) => {
    try{
        const Id = req.params.id;
        const delData = await schemaImg.findByIdAndDelete(Id);
        
        //Hapus file dari sistem
        if(delData && delData.path){
            fs.unlink(delData.path,(err) => {
                if(err) console.log("Error deleting file :",err)
            })
        }
        
        res.status(200).json(delData);
    }catch(err){
        res.status(500).json(err)
    }
})

rute.patch("/dataImg/:id",upload.single('image'),async(req,res) => {
    try{
        const image = await schemaImg.findById(req.params.id);
        //Jika gambar ada maka hapus gambar lama
        if(image){
            if(image.path){
                fs.unlink(image.path,(err)=> {
                    if(err) console.log(err);
                })
            }

            //Update dengan gambar baru
            image.filename = req.file.filename;
            image.path = req.file.path;
            image.originalName = req.file.originalName
            await image.save();
            res.status(200).json(image);
        }
    }catch(err){
        console.log(err)
    }
})

module.exports = rute;
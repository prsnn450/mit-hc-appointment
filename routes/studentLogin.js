const express = require('express')
const router= express.Router();
const mongoose = require ('mongoose')

const student= require("../models/studentSchema")

router.post('/signUp',async (req,res)=>{
    try
    {const {name,registerNumber,dob,department,gender} = req.body;
    const existingUser = await student.findOne({registerNumber});
    if(existingUser){
        return res.status(409).json({error:"User already exist"});
    }

    const newStudent=  new student({
        name,
        registerNumber,
        dob,
        department,
        gender,
        password: dob.toString().slice(0,10) 
    })

    const savedStudent= await newStudent.save();
    res.status(201).json({
        message: "Student signed up successfully",
        student: newStudent
    });
} catch(error){
    console.log(error);
    res.status(500).json({ error: 'Sign-up failed' });
}
});

router.post('/login', async (req,res) =>{
    try{
        const {registerNumber,password} = req.body;
        const Student= await student.findOne({registerNumber: registerNumber});
        if(!Student){
            return res.status(404).json({error:'Student not found'});
        }

        if(password!=Student.password){
            return res.status(401).json({error:'Invalid password'});
        }

        res.status(200).json({
            message:"Login succesful",
            student:{
                name:Student.name,
                registerNumber:Student.registerNumber
            }
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"Login failed"})
    }
});

module.exports = router;
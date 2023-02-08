import bcrypt from "bcrypt";
import pool from "../db.js";
import { addUser, getUsers } from "../queries.js";
import express from "express";



const getUsersController = async (req,res)=>{
    try {
        const users = await pool.query(getUsers)
        res.status(200).json({users: users.rows})
        
    } catch (error) {
        res.status(500).json({error:error.message})
        console.log(error);
    }
}
const addUserController = async (req,res)=>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await pool.query(addUser, [req.body.name,req.body.email, hashedPassword]);
        res.status(200).json({users: newUser.rows[0]})
    } catch (error) {
        res.status(500).json({error:error.message})
        console.log(error);
    }
}


export {
    getUsersController,
    addUserController
}
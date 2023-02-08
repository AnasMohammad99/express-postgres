import pool from "../db.js";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtTokens } from "../utils/jwt-helper.js";


const router = express.Router();

router.post('/', async (req,res)=>{
    try {
        const {email, password} = req.body;
        const users = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);
        // email check
        if(users.rows.length === 0 ) return res.status(404).json({error: "wrong email"});
        //password check
        const checkPassword = await bcrypt.compare(password,users.rows[0].user_password)
        if(!checkPassword) return res.status(404).json({error: "wrong password"});
        // return jwt
        const tokens = jwtTokens(users.rows[0])
        res.cookie('refresh_token', tokens.refreshToken, {httpOnly: true})
        res.status(201).json({tokens});
    } catch (error) {
        res.status(404).json({error: error.message})
    }
    router.get('/refresh_token', (req, res)=>{
        try {
            const refreshToken = req.cookies.refresh_token;
            if(refreshToken===null) return res.status(404).json({error: "no token"})
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (error, user)=>{
                if(error) return res.status(404).json({error: "wrong token"})
                const tokens = jwtTokens(user);
                res.cookie('refresh_token', tokens.refreshToken, {httpOnly: true})
                res.status(200).json({tokens})
            })
        } catch (error) {
            res.status(404).json({error: error.message})
        }
    })
})




export default router
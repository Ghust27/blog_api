const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const db = require('../db/db')
const jwt = require('jsonwebtoken')


router.post('/register',async (req,res)=>{
    try{
        const {username,email,password} = req.body
        
        if(!username || !email || !password){
            return res.status(400).json({error:'missing required fields'})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const queryText = `
        insert into users (username,email,password)
        values ($1, $2, $3)
        returning id, username, email;        
        `

        const values = [username, email, hashedPassword]

        const result = await db.query(queryText, values)

        return res.status(201).json(result.rows[0])

    }catch (err){
        console.error("Error registering user",err)
        res.status(500).json({error:"Server error"})
    }
})

router.post('/login',async(req,res)=>{
    try{
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({error:"missing required fields"})
        }

        const userQuery = `select * from users where email = $1`
        const userResult = await db.query(userQuery,[email])
        if (userResult.rows.length === 0){
            return res.status(401).json({error:"invalid email or password."})
        }

        const user = userResult.rows[0]
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).json({error:"invalid email or password."})
        }

        const token = jwt.sign({userId:user.id, email:user.email},
            process.env.JWT_SECRET,
            {expiresIn:'2h'}
        )

        res.json({
            message:"Login successful",
            token:token,
            user:{
                id:user.id,
                username:user.username,
                email:user.email
            }
        })
    }catch (err){
        console.error("Error during login",err)
        res.status(500).json({error:"Server Error."})
    }

})

module.exports = router
const express = require('express')
const app = express()
const cors = require('cors')
const userRoutes = require('./src/routes/users')
const postsRoutes = require('./src/routes/posts');

require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use('/api/posts', postsRoutes);
app.use('/api/users',userRoutes)

app.get('/',(req,res)=>{
    res.json({message:"API is running."})
})

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`The server is running on the port: ${PORT}`)
})
require('dotenv').config()

//imports
const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const cors = require('cors')
// create a express app
const app = express()

//middileware
app.use(cors())
app.use(express.json())


app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next()
})

//home route 
app.get('/',(req , res)=>{
    console.log("You are on home")
    res.send(
        "Welcome to workout api | getworkout  add /api/workouts/ to the end of the link")
})

// routes file
app.use('/api/workouts',workoutRoutes)


//connect to db 
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        //listen for request
        app.listen(process.env.PORT,()=>{
        console.log("connected to db & listening to port",process.env.PORT)
        })
    })
    .catch((error)=>{
        console.log(error)
    })

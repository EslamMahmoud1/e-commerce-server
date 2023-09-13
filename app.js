const express = require('express')
const app = express()
const connectDB = require('./db/connection')
const product = require('./routes/productsRoutes')
require('dotenv').config()

app.get('/',(req,res) => {
    res.send('homepage')
})

app.use('/api/v1/product',product)

const port = 3000

const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,() => {
        console.log(`Server listens on port http://localhost:${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()
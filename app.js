const express = require('express')
const app = express()
const connectDB = require('./db/connection')
const product = require('./routes/productsRoutes')
const user = require('./routes/usersRoutes')
require('dotenv').config()

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })

app.get('/',(req,res) => {
    res.send('homepage')
})

app.use('/api/v1/product',product)

app.use('/api/v1/user',user)

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
require('dotenv').config({path: './starter/.env'})
require('express-async-errors')

const express = require('express')
const app = express()
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')
const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')

// .apply.errorMiddleware
app.use(express.json())

app.get('/', (req, res) => {
    res.send('<h1>Store Api</h1> <a href="api/v1/products"> products </a>')
})

app.use('/api/v1/products', productsRouter)

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        //connect to db
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening to port ${port}`);
        })
    } catch (error) {
        
    }
}

start()

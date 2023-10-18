// DECLARING THE DEPENDENCIES--> DEPENDENCIES ARE THE PACKAGES THAT WE NEED TO INSTALL TO MAKE OUR APPLICATION WORK.
const express = require('express')
const cors = require('cors')
// declaring mongoose to connect to mongodb
const mongoose = require('mongoose')

// declaring express app 
const app = express()

const Product = require('./models/productmodel')

// declaring port
const port = 3000

app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
}));

// DECLARING MIDDLEWARE --> MIDDLEWARE IS A FUNCTION THAT HAS ACCESS TO THE REQUEST AND RESPONSE OBJECTS.
// we are using express middleware to parse the json data coming from the client
app.use(express.json())

// we are using express middleware to parse the urlencoded data coming from the client
app.use(express.urlencoded({ extended: false }))

// DECLARING ROUTES --> ROUTES ARE USED TO PERFORM CRUD OPERATIONS ON THE DATABASE.
app.get('/', (request, response) => {
    response.send("Hello World")
})

app.get('/blog', (request, response) => {
    response.send("Welcome to SHERLOCK's blog")
})

// GETTING DATA FROM THE DATABASE --> GET REQUEST
// getting all the products from the database.
app.get('/products', async (req, res) => {
    try {
        // get all the products
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            "message": error.message
        })

    }
})

// FETCH A SINGLE PRODUCT FROM THE DATABASE --> GET REQUEST
app.get('/product/:id', async (req, res) => {
    try {
        // search by ID mentioned in the request parameters.
        const { id } = req.params;
        const products = await Product.findById(id);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            "message": error.message
        })
    }
})

// CREATE DATA IN THE DATABASE--> POST REQUEST
// adding products accordinng to the schema , to the database.
app.post('/product', async (req, res) => {
    try {
        // creating a new product.
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        // console.log(eror.message);
        res.status(500).json({ "message": error.message })
    }
})


//UPDATING DATA IN THE DATABASE --> PUT REQUEST
app.put('/products/:id', async (req, res) => {
    try {
        // search by ID mentioned in the request parameters.
        const { id } = req.params;
        // update the product with the data from the request body.
        const product = await Product.findByIdAndUpdate(id, req.body);
        // if product is not found, send 404 and error message.
        if (product) {
            const UpdatedProduct = await Product.findById(id);
            return res.status(200).json(UpdatedProduct)
            // if product is found, send the updated product data. 
        }
        res.status(404).json({
            message: `cannot find the product with ID: ${id}`
        });
    } catch (error) {
        // console.log(eror.message)
        res.status(500).json({ "message": error.message })
    }
})



// DELETING DATA FROM THE DATABASE --> DELETE REQUEST
app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            res.status(404).json({
                "message": `cannot find the product with ID: ${id}`
            })
        }
        res.status(200).json({
            "message": "Product deleted successfully!"
        })
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({
            "message": error.message
        })
    }
})

// CONNECTING TO THE DATABASE --> MONGODB
mongoose.connect('mongodb://sujayghoshcool:z1y2x3w4@cluster1-shard-00-00.oppb2.mongodb.net:27017,cluster1-shard-00-01.oppb2.mongodb.net:27017,cluster1-shard-00-02.oppb2.mongodb.net:27017/?ssl=true&replicaSet=atlas-14fj07-shard-0&authSource=admin&retryWrites=true&w=majority').then(() => {
    console.log("Database successfully connected!");
    app.listen(port, () => {
        console.log(`Server is active on: ${port}`)
    })
}).catch((error) => {
    console.log(error.message);
})
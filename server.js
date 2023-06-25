const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000


app.get('/', (request, response) => {
    response.send("Hello World")
})

app.get('/blog', (request, response) => {
    response.send("Welcome to SHERLOCK's blog")
})




mongoose.connect('mongodb://admin:Subha12345@ac-cjbmvrj-shard-00-00.roavua4.mongodb.net:27017,ac-cjbmvrj-shard-00-01.roavua4.mongodb.net:27017,ac-cjbmvrj-shard-00-02.roavua4.mongodb.net:27017/?ssl=true&replicaSet=atlas-cfb1ut-shard-0&authSource=admin&retryWrites=true&w=majority').then(() => {
    console.log("Database successfully connected!");
    app.listen(port, () => {
        console.log(`Server is active on: ${port}`)
    })
}).catch((error) => {
    console.log(error);
})
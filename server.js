const express = require('express')
const app = express()
const port = 3000


app.get('/', (request, response) => {
    response.send("Hello World")
})

app.get('/blog', (request, response) => {
    response.send("Welcome to SHERLOCK's blog")
})

app.listen(port, () => {
    console.log(`Server is active on: ${port}`)
})
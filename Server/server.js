const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/productmodel'); // Import the User model

const app = express();
const port = 3005;

app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (request, response) => {
    response.send("Hello World");
});

app.get('/blog', (request, response) => {
    response.send("Welcome to SHERLOCK's blog");
});

// GET all users from the database
// GET all users from the database
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            "message": error.message
        });
    }
});


// GET a single user by ID
app.get('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            "message": error.message
        });
    }
});

// CREATE a user
app.post('/user', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
});

// UPDATE a user by ID
app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        if (user) {
            const updatedUser = await User.findById(id);
            return res.status(200).json(updatedUser);
        }
        res.status(404).json({
            message: `Cannot find the user with ID: ${id}`
        });
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
});

// DELETE a user by ID
app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            res.status(404).json({
                "message": `Cannot find the user with ID: ${id}`
            });
        }
        res.status(200).json({
            "message": "User deleted successfully!"
        });
    } catch (error) {
        res.status(500).json({
            "message": error.message
        });
    }
});

mongoose.connect('mongodb+srv://sujayghoshcool:z1y2x3w4@cluster1.oppb2.mongodb.net/ZeeBanglaMuktoMancho?retryWrites=true&w=majority').then(() => {
    console.log("Database successfully connected!");
    app.listen(port, () => {
        console.log(`Server is active on: ${port}`);
    });
}).catch((error) => {
    console.log(error.message);
});

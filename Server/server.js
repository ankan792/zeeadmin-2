const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/productmodel'); // Import the User model
const VerifiedUser = require('./models/verifiedUserModel');
const unVerifiedUser = require('./models/unverifiedUserModel');

const app = express();
const port = 3005;

const corsOptions = {
    origin: '*',
  };

  app.use(cors(corsOptions));

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

app.get('/verified-users', async (req, res) => {
    try {
        const verifiedusers
        = await VerifiedUser.find({});
        res.status(200).json(verifiedusers);
    } catch (error) {
        res.status(500).json({
            "message": error.message
        });
    }
});

app.get('/unverified-users', async (req, res) => {
    try {
        const unverifiedusers
        = await unVerifiedUser.find({});
        res.status(200).json(unverifiedusers);
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

app.post('/verified-users', async (req, res) => {
    try {
      const userCopy = req.body;
      const verifiedUser = new VerifiedUser(userCopy);
  
      await verifiedUser.save();
  
      res.status(200).json({
        message: 'User accepted and moved to verified users.',
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post('/unverified-users', async (req, res) => {
    try {
      const userCopy1 = req.body;
      const unverifiedUser = new unVerifiedUser(userCopy1);
  
      await unverifiedUser.save();
  
      res.status(200).json({
        message: 'User accepted and moved to verified users.',
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// app.put('/accept-user/:id', async (req, res) => {
//     try {
//       const { id } = req.params;
//       // Find the user in the User model
//       const user = await User.findById(id);
  
//       if (!user) {
//         return res.status(404).json({
//           message: `Cannot find the user with ID: ${id}`,
//         });
//       }
  
//       // Create a new verified user document
//       const verifiedUser = new VerifiedUser({
//         name: user.name,
//         address: user.address,
//         city: user.city,
//         pinCode: user.pinCode,
//         representation: user.representation,
//         representation1: user.representation1,
//         phoneNumber: user.phoneNumber,
//         phoneNumber1: user.phoneNumber1,
//         email: user.email,
//         regNumber: user.regNumber,
//         aadharCard: user.aadharCard,
//         aadharCard1: user.aadharCard1,
//         registrationForm: user.registrationForm,
//       });
  
//       // Remove the user from the User model
//     //   await User.findByIdAndDelete(id);
  
//       // Save the verified user document
//       await verifiedUser.save();
  
//       res.status(200).json({
//         message: 'User accepted and moved to verified users.',
//       });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });

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

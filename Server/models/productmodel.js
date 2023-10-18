const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [ true, "Enter Product name."] //validation message is given as second parameter.
        },
        quantity:{
            type: Number,
            required: true,
            default: 0
        },
        price:{
            type: Number,
            required: true,
        },
        image:{
            type: String,
            required: false,
        }

    },
    {
        timestamps: true //used to track when data is created or modified in the database.
    }
)

const Product = mongoose.model('Product', productSchema) //Now, we have model named 'Product' which is based on productSchema.

module.exports = Product //exporting the model.
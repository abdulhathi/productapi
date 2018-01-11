

const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Name: { type: String, required: true},
    Price: { type: Number, required: true },
    ProductImage: { type: String, required: false}
});

module.exports = mongoose.model("Product", productSchema);
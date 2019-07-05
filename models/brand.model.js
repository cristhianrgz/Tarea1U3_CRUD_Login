const mongoose = require('mongoose');

let brandSchema = new mongoose.Schema({
    brand: {
        required: true,
        type: String
    }
});

const brandModel = mongoose.model('Brand', brandSchema, 'Brands');

module.exports = brandModel;
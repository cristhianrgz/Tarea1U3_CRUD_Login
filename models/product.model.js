const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const SchemaTypes = mongoose.Schema.Types;

let productSchema = new mongoose.Schema({
    codigo:{
        type: String,
        required:true
    },
    pcompra:{
        type: SchemaTypes.Double,
        required:true
    },
    pventa:{
        type: SchemaTypes.Double,
        required:true
    },
    marca:{
        type:String,
        required: true
    },
    cant:{
        type: SchemaTypes.Double,
        required:true
    },
    minimo:{
        type:Number,
        required:true
    },
    maximo:{
        type:Number,
        required:true
    }
});

const productModel = mongoose.model('Product', productSchema, 'Products');

module.exports = productModel;
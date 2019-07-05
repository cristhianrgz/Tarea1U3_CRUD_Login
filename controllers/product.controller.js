const http = require('http');
const path = require('path');
const status = require("http-status");

let _product;

//Insertar producto
const createProduct = (req, res) => {
    const product = req.body;

    _product.create(product)
        .then((data)=> {
            res.status(200);
            res.json({msg:"Producto registrado correctamente", data: data});
        })
        .catch((err)=> {
            res.status(400);
            res.json({msg:"Error!!!!", data:err});
        })
}

//Consulta general
const findAll =(req, res) =>{
    _product.find().then((data) =>{
        if(data.length == 0){
            res.status(status.NO_CONTENT);
            res.json({msg:"No se encontraron productos"});
        }
        else{
            res.status(status.OK);
            res.json({msg:"Éxito, estas son los productos encontrados!!",data:data});
        }
    })
    .catch((err) => {
        res.status(status.BAD_REQUEST);
        res.json({msg:"Error!!"});
    });
}

//Consulta por id
const consultaUno = (req, res) => {
    const {id} = req.params;
    const params = {
        _id: id
    };
    _product.findOne(params).then((data) => {
        res.status(status.OK);
        res.json({msg:"Éxito!!, consulta de un producto",data:data});
    })
    .catch((err) => {
        res.status(status.NOT_FOUND);
        res.json({msg:"Error!!, No se pudo encontrar el producto",err:err});
    });
}

//Update producto
const updateById = (req,res) =>{
    const product = req.body;
    const {id} = req.params;

    const params = {
        _id: id
    }
    _product.findByIdAndUpdate(params,product).then((data) =>{
        res.status(status.OK);
        res.json({msg:"Éxito, Producto actualizado!!",data:data});
    })
    .catch((err) =>{
        res.status(status.NOT_FOUND);
        res.json({msg:"Error, no se pudo actualizar!!",err:err}); 
    });
}

//Eliminar producto
const deleteById = (req,res) =>{
    const {id} = req.params;

    const params = {
        _id: id
    }
    _product.findByIdAndRemove(params).then((data) =>{
        res.status(status.OK);
        res.json({msg:"Éxito, Producto eliminado!!",data:data});
    })
    .catch((err) =>{
        res.status(status.NOT_FOUND);
        res.json({msg:"Error, no se pudo eliminar!!",err:err}); 
    });
}
module.exports = (Product) => {
    _product = Product;
    return({
        createProduct,
        findAll,
        consultaUno,
        updateById,
        deleteById
    });
}

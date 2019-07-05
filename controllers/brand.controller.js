const http = require('http');
const path = require('path');
const status = require("http-status");

let _brand;

//Insertar marca
const createBrand = (req, res) => {
    const brand = req.body;

    _brand.create(brand)
        .then((data)=> {
            res.status(200);
            res.json({msg:"Marca creada correctamente", data: data});
        })
        .catch((err)=> {
            res.status(400);
            res.json({msg:"Error!!!!", data:err});
        })
}

//Consulta general
const findAll =(req, res) =>{
    _brand.find().then((data) =>{
        if(data.length == 0){
            res.status(status.NO_CONTENT);
            res.json({msg:"No se encontraron marcas"});
        }
        else{
            res.status(status.OK);
            res.json({msg:"Éxito, estas son las marcas encontradas!!",data:data});
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
    _brand.findOne(params).then((data) => {
        res.status(status.OK);
        res.json({msg:"Éxito!!, consulta de una marca",data:data});
    })
    .catch((err) => {
        res.status(status.NOT_FOUND);
        res.json({msg:"Error!!, No se pudo encontrar la marca",err:err});
    });
}

//Update marca
const updateById = (req,res) =>{
    const brand = req.body;
    const {id} = req.params;

    const params = {
        _id: id
    }
    _brand.findByIdAndUpdate(params,brand).then((data) =>{
        res.status(status.OK);
        res.json({msg:"Éxito, Marca actualizada!!",data:data});
    })
    .catch((err) =>{
        res.status(status.NOT_FOUND);
        res.json({msg:"Error, no se pudo actuaizar!!",err:err}); 
    });
}

//Eliminar marca
const deleteById = (req,res) =>{
    const {id} = req.params;

    const params = {
        _id: id
    }
    _brand.findByIdAndRemove(params).then((data) =>{
        res.status(status.OK);
        res.json({msg:"Éxito, Marca eliminada!!",data:data});
    })
    .catch((err) =>{
        res.status(status.NOT_FOUND);
        res.json({msg:"Error, no se pudo eliminar!!",err:err}); 
    });
}
module.exports = (Brand) => {
    _brand = Brand;
    return({
        createBrand,
        findAll,
        consultaUno,
        updateById,
        deleteById
    });
}

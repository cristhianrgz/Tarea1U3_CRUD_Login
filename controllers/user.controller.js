const http = require('http');
const path = require('path');
const status = require("http-status");

let _user;
//Insertar
const createUser = (req, res) => {
    const user = req.body;

    _user.create(user)
        .then((data)=> {
            res.status(200);
            res.json({msg:"Usuario creado correctamente", data: data});
        })
        .catch((err)=> {
            res.status(400);
            res.json({msg:"Error!!!!", data:err});
        })
}

//Consulta general
const findAll =(req, res) =>{
    _user.find().then((data) =>{
        if(data.length == 0){
            res.status(status.NO_CONTENT);
            res.json({msg:"No se encontraron usuarios"});
        }
        else{
            res.status(status.OK);
            res.json({msg:"Éxito!!",data:data});
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
    _user.findOne(params).then((data) => {
        res.status(status.OK);
        res.json({msg:"Éxito!!, consulta de un usuario",data:data});
    })
    .catch((err) => {
        res.status(status.NOT_FOUND);
        res.json({msg:"Error!!, No se pudo encontrar el usuario",err:err});
    });
}

//Update
const updateById = (req,res) =>{
    const user = req.body;
    const {id} = req.params;

    const params = {
        _id: id
    }
    _user.findByIdAndUpdate(params,user).then((data) =>{
        res.status(status.OK);
        res.json({msg:"Éxito!!",data:data});
    })
    .catch((err) =>{
        res.status(status.NOT_FOUND);
        res.json({msg:"Error, no se pudo actuaizar!!",err:err}); 
    });
}

//Eliminar
const deleteById = (req,res) =>{
    const {id} = req.params;

    const params = {
        _id: id
    }
    _user.findByIdAndRemove(params).then((data) =>{
        res.status(status.OK);
        res.json({msg:"Éxito!!",data:data});
    })
    .catch((err) =>{
        res.status(status.NOT_FOUND);
        res.json({msg:"Error, no se encontro!!",err:err}); 
    });
}

//Login
const loginUsuarios = (req, res) => {
    const {name, password} = req.params;
    const params = {
        name: name,
        password: password
    }
    _user.findOne(params).then((data) => {
        res.status(status.OK);
        if(data.length == 0){
            res.status(status.NO_CONTENT);
            res.json({msg:"No se encontraron las credenciales"});
        }
        else{
            res.status(status.OK);
            res.json({msg:"Exito!!,", data:data})
        }
    })
    .catch((err) => {
        res.status(status.BAD_REQUEST);
        res.json({msg:"Error!!"});
    });
}
module.exports = (User) => {
    _user = User;
    return({
        createUser,
        findAll,
        consultaUno,
        deleteById,
        updateById,
        loginUsuarios

    });
}

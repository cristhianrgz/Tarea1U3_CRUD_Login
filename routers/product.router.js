const router = require('express').Router();

module.exports = (wagner) => {
    
    const productCtrl = wagner.invoke((Product) => 
        require('../controllers/product.controller')(Product));
    
    router.post('/', (req, res) =>
        productCtrl.createProduct(req, res));
    
    router.get('/', (req, res) =>
        productCtrl.findAll(req, res));

    router.get('/:id', (req, res) =>
        productCtrl.consultaUno(req, res));
    
    router.put('/:id', (req, res) =>
        productCtrl.updateById(req, res));

    router.delete('/:id', (req, res) =>
        productCtrl.deleteById(req, res));

    return router;
}
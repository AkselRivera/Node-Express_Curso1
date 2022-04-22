const express= require('express');
const productsService = require('../services/productsService');
const validatorHandler = require('../middlewares/validatorHandler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/productSchema');


const router=express.Router();
const service= new productsService();

router.get('/', async(req, res)=>{
    const products = await service.find();
    res.json(products);
});

router.get('/:id', 
    validatorHandler( getProductSchema, 'params'),
    async(req,res, next)=>{
    try {
        const id = req.params.id;
        // const {id} = req.params; Destructuracion    
        const product = await service.findOne(id);
            res.json(product);
    } catch (error) {
        next(error)
    }    
});


router.post('/', 
    validatorHandler(createProductSchema,'body'),
    async(req,res)=>{
    const body = req.body;
    const newProduct= await service.create(body);

    res.status(201).json({
        message:'Creación de producto',
        data: newProduct
    })
})


router.patch('/:id',
    validatorHandler(getProductSchema,'params'),
    validatorHandler(updateProductSchema,'body'),
    async (req,res, next)=>{
    try {
        const {id} = req.params;
        const body = req.body;
        const updateProd = await service.update(id,body);

        res.json(updateProd);

    } catch (error) {
        // res.status(404).json({
        //     message:error.message
        // });
        next(error);
    }
    
})


router.delete('/:id', (req,res)=>{
    const {id} = req.params;

    const delProd = service.delete(id);
    res.json(delProd);
})


module.exports=router;
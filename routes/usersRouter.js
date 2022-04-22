
const express = require('express');
const faker = require('faker');

const router = express.Router();


router.get('/', (req,res)=>{

    const {page} = req.query;
    if(page){
        res.json({
            name: faker.name.firstName(),
            lastName: faker.name.lastName(),
            phone:faker.phone.phoneNumber('55-####-###') ,
            page
        })
    }

    else{
        res.send('No hay mas resultados')
    }

});

module.exports= router;
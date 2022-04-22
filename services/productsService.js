const faker = require('faker');
const boom = require('@hapi/boom');



class productsService{

    constructor(){
        this.products=[];
        this.generate();
    }

    generate(){
        for( let i =0 ; i<100;i++){
            this.products.push({
                id: faker.datatype.uuid(),
                name:faker.commerce.productName(),
                price:parseInt(faker.commerce.price(),10),
                image: faker.image.imageUrl(),
                isBlock: faker.datatype.boolean()
            })
        }
    }

    create(data){

        const newProd ={
            id: faker.datatype.uuid(),
            ...data
        }
        this.products.push(newProd);
        return newProd;
    }

    find(){
        return new Promise ((resolve,reject)=>{
            setTimeout(()=>{
                resolve(this.products)
            },5000);
        })
        // return this.products;
    }

    // find(){
    //     return this.products;
    // }

    async findOne(id){
        const product =this.products.find( item => item.id === id)
        if(!product){
            throw boom.notFound('Producto no encontrado');
        }
        
        if(product.isBlock){
            throw boom.conflict('Producto bloqueado');
        }
        return product
    }

    async update(id,changes){
        const index= this.products.findIndex(item => item.id === id);
        if( index ===-1){
            throw boom.notFound("Product not found");
        }
        const product =this.products[index];
        this.products[index]= {
            ...product,
            ...changes
        };

        return this.products[index];
    }

    async delete(id){
        const index= this.products.findIndex(item => item.id === id);
        if( index ===-1){
            throw new Error ('Producto no encontrado');
        }
        this.products.splice(index,1);
        return {id, message:'Producto elimnado correctamente'};
    }
}

module.exports= productsService;

const express= require('express');
const cors= require('cors');
const { errorHandler, logErrors, boomErrorHandler } = require('./middlewares/errorHandle');
const routerApi= require('./routes/indexRouter');


const app = express();
const port= 3000;

// el middleware de express que me permite recibir la información de POST en formato json
app.use(express.json());

const whiteList =['http://localhost:3001','http://muap.co']
const options={
    origin : (origin, callback)=>{
        if( whiteList.includes(origin) || !origin){
            callback(null,true);
        }else{
            callback(new Error('No permitio'));
        }
    }
}
app.use(cors(options));


app.get('/', (req, res)=>{
    res.send('Hola, mi server en express');
});

app.get('/nueva-ruta', (req, res)=>{
    res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


// app.get('/categories/:categoryId/products/:productId', (req,res)=>{
//     const {categoryId, productId} = req.params;

//     res.json({
//         categoryId,
//         productId
//     });
// })

// // QUERY PARAMETERS :)




app.listen(port, ()=>{
    console.log(port,' en ejecución....');
})
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

mongoose.connect("mongodb://shoppingkart:"+ process.env.Mongo_Atlas_ShoppingKart +"@shopping-kart-shard-00-00-oj115.mongodb.net:27017,shopping-kart-shard-00-01-oj115.mongodb.net:27017,shopping-kart-shard-00-02-oj115.mongodb.net:27017/test?ssl=true&replicaSet=Shopping-Kart-shard-0&authSource=admin"
);

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// app.use((req,res,next) => {
//     res.header("Access-Control-Allow-Origin","*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     if(req.method == 'OPTIONS'){
//         res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, PATCH");
//     }
//     next();
// })
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
//Handling routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// app.use((req, res, next) => {
//     res.status(200).json({
//         message: "Success"
//     });
// });

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;
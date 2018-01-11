const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log(file);
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        console.log(file);
        cb(null, new Date().toISOString() + file.originalname);
    }
})

const upload = multer({storage: storage});

const Product = require('../models/product');

router.get('/', (req, res, next) => {
    Product.find().select('_id Name Price ProductImage').then(doc => {
        res.status(200).json(doc);
    });
});

router.post('/', upload.single('productImage'), (req, res, next) => {
    //console.log(req.file);
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        Name: req.body.Name,
        Price: req.body.Price,
        ProductImage: req.file.path
    })
    //console.log(req.url); console.log(req.baseUrl); console.log(req.originalUrl);
    product.save().then(result => { 
        console.log(result); 
        res.status(200).send(result);
    }).catch(error => {
        console.log(error);
        res.status(500).send(error);
    });
    // res.status(201).json({
    //     message: 'Handling POST request to /product',
    //     Product: product
    // });
});

router.get('/:productId', (req, res, next) => {
    const pId = req.params.productId;
    Product.findById(pId).exec().then(doc => {
        console.log("From database", doc);
        if(doc){
            res.status(200).json(doc);
        }
        else{
            res.status(500).json({message: "Invalid Id"});
        }
    }).catch(error => {
            console.log(error);
            res.status(500).json({ error: error });
        });
    // res.status(200).json({
    //     message: pId
    // });
});

router.put('/:productId', (req, res, next) => {
    console.log("this Put request");
});

router.patch('/:productId', (req, res, next) => {
    console.log(req.params.productId);
    const id = req.params.productId;
    console.log(req.body);
    const updateItems = {};
    for (const item of req.body) {
        updateItems[item.key] = item.value;
    }
    Product.update({_id: id}, { $set: updateItems}).exec().then(result => {
        res.send(result);
    }).catch(error=> {res.send(error)});
    // res.status(200).json({
    //     message: 'Updated product'
    // });
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id: id})
    .exec()
    .then(result => {res.send(result);})
    .catch(error => {res.send(error);})
    res.status(200).json({
        message: 'Deleted product',
        productId: id
    });
});

module.exports = router;
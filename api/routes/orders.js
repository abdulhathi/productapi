const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
const Order = require('../models/order');

router.get('/', (req, res, next) => {
    Order.find().then(result => {
        res.send(result);
    });
    // res.status(200).json({
    //     message: 'Handling GET request to /order'
    // });
});

router.post('/', (req, res, next) => {
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.product
    });
    order.save().then(result => {
        res.send(result);
    }).catch(error => {
        res.send(error);
    });
});

router.get('/:orderId', (req, res, next) => {
    const pId = req.params.orderId;
    res.status(200).json({
        message: pId
    });
});

router.patch('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated order'
    });
});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted order'
    });
});

module.exports = router;
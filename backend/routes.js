const express = require("express");
const Payment = require('./Db');
const ethers = require('ethers');
const PaymentProcessor = require('../build/contracts/PaymentProcessor.json');
const router = express.Router();


const Items = {
    '1' : {id : 1, url: 'http://urlToDownloadItem1'},
    '2' : {id : 2, url: 'http://urlToDownloadItem2'},
    '3' : {id : 3, url: 'http://urlToDownloadItem3'},
}

router.get('/api/getPaymentId/:itemId' , async (req, res)=>{
    const paymentId = (Math.random()*1000).toFixed(0);
    await Payment.create({
        id: paymentId,
        itemId: req.params.itemId,
        paid: true
    })
    res.status(200).json({ 
        status: 'success',
        paymentId
    })
})

router.get('/api/getItemUrl/:paymentId', async (req, res) => {
    const payment = await Payment.findOne({id: req.params.paymentId});

    if(payment && payment.paid === true){
        res.status(200).json({
            url : items[payment.itemId].url
        })
    }else{
        res.json({
            url : ''
        })
    }
})



module.exports = router;
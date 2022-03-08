const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Payment = require('./Db');
const ethers = require('ethers');
const PaymentProcessor = require('../frontend/src/contracts/PaymentProcessor.json');


dotenv.config();

const app = express();
const router = express.Router();

mongoose
  .connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

app.use(cors());
app.use('/', router)


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

app.listen(8000, () => {
  console.log("server has Started");
});


const listenToEvents = () => {
    const provider = new ethers.providers.JsonRpcProvider('http://localhost:9545');
    const networkI = '5777';

    const paymentProcessor = new ethers.Contract(
        PaymentProcessor.networks[networdId].address,
        PaymentProcessor.abi,
        provider
    )

    paymentProcessor.on('PaymentDone', async (payer, amount, paymentId, date)=>[
        console.log(`
        from: ${payer}
        amount : ${amount}
        paymentId : ${paymentId}
        date : ${(new Date(date.toNumber()*1000)).toDateString()}
        `)
    ])
}



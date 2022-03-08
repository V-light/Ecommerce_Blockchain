const mongoose = require('mongoose');


const paymentSchema = new mongoose.Schema({
 id: String,
 itemID : String,
 paid : Boolean
})
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
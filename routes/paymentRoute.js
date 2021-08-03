const router = require('express').Router();

const verifyToken = require('../middleware/verifyToken');
const paymentController = require('../controllers/paymentController');

router.post('/payment', verifyToken, paymentController.createPayment);


router.get('/payment/:id', verifyToken, paymentController.getPaymentByID);

router.get('/payment/admin/:id', verifyToken, paymentController.getPaymentByAdminID);

router.get('/payment_charges', verifyToken, paymentController.getAllCharges);

router.get('/payment_deposits', verifyToken, paymentController.getAllDeposits);


module.exports = router;
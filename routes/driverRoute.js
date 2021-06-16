const router = require('express').Router();

const verifyToken = require('../middleware/verifyToken');
const driverController = require('../controllers/driverController');
const adminController = require('../controllers/adminController');
const { route } = require('./ownerRoute');


router.post('/driver', verifyToken, driverController.signUp);


router.get('/driver/:id', verifyToken, driverController.getDriver);


router.patch('/driver/password', verifyToken, driverController.updatePassword);

router.patch('/driver/phone-number', verifyToken, driverController.updatePhoneNumber);

router.patch('/driver/email-address', verifyToken, driverController.updateEmailAddress);


router.put('/driver/:id', verifyToken, driverController.updateDriver);


router.delete('/driver/:id', verifyToken, adminController.validate, driverController.deleteAccount);


module.exports = router;
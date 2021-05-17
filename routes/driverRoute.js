const router = require('express').Router();

const verifyToken = require('../middleware/verifyToken');
const driverController = require('../controllers/driverController');


router.get('/driver', verifyToken, driverController.getDriver);


router.post('/driver/signUp', verifyToken, driverController.signUp);


router.patch('/driver/password', verifyToken, driverController.updatePassword);

router.patch('/driver/phoneNumber', verifyToken, driverController.updatePhoneNumber);

router.patch('/driver/emailAddress', verifyToken, driverController.updateEmailAddress);

router.delete('/driver', verifyToken, driverController.deleteAccount);


module.exports = router;
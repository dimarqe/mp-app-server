const router = require('express').Router();

const verifyToken = require('../middleware/verifyToken');
const studentController = require('../controllers/studentController');


router.get('/student', verifyToken, studentController.getStudent);


router.post('/student/signUp', verifyToken, studentController.signUp);


router.patch('/student/password', verifyToken, studentController.updatePassword);

router.patch('/student/phoneNumber', verifyToken, studentController.updatePhoneNumber);

router.patch('/student/emailAddress', verifyToken, studentController.updateEmailAddress);

router.delete('/student', verifyToken, studentController.deleteAccount);

module.exports = router;
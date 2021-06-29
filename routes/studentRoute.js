const router = require('express').Router();

const verifyToken = require('../middleware/verifyToken');
const studentController = require('../controllers/studentController');
const adminController = require('../controllers/adminController');


router.post('/student', verifyToken, studentController.signUp);


router.get('/student/:id', verifyToken, studentController.getStudent);

router.get('/student', verifyToken, studentController.getAllStudents);


router.patch('/student/password', verifyToken, studentController.updatePassword);

router.patch('/student/phone-number', verifyToken, studentController.updatePhoneNumber);

router.patch('/student/email-address', verifyToken, studentController.updateEmailAddress);


router.put('/student/:id', verifyToken, studentController.updateStudent);


router.delete('/student/:id', verifyToken, adminController.validate, studentController.deleteAccount);

module.exports = router;
const router = require('express').Router();

const verifyToken = require('../middleware/verifyToken');
const appointmentController = require('../controllers/appointmentController');
//const adminController = require('../controllers/adminController');


router.post('/appointment', verifyToken, appointmentController.createAppointment);


router.get('/appointment/:id', verifyToken, appointmentController.getAppointmentByID);

router.get('/appointment/student/:id', verifyToken, appointmentController.getAppointmentByStudentID);

router.get('/appointment/driver/:id', verifyToken, appointmentController.getAppointmentByDriverID);


router.put('/appointment/schedule/:id', verifyToken, appointmentController.updateAppointmentSchedule);

router.put('/appointment/origin/:id', verifyToken, appointmentController.updateAppointmentOrigin);

router.put('/appointment/destination/:id', verifyToken, appointmentController.updateAppointmentDestination);


router.delete('/appointment/:id', verifyToken, appointmentController.deleteAppointment);

module.exports = router;
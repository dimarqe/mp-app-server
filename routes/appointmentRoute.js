const router = require('express').Router();

const verifyToken = require('../middleware/verifyToken');
const appointmentController = require('../controllers/appointmentController');
//const adminController = require('../controllers/adminController');


router.post('/appointment', verifyToken, appointmentController.createAppointment);


router.get('/appointment', verifyToken, appointmentController.getAvailableAppointments);

router.get('/appointment/:id', verifyToken, appointmentController.getAppointmentByID);

router.get('/appointment/student/:id', verifyToken, appointmentController.getAppointmentByStudentID);

router.get('/appointment/driver/:id', verifyToken, appointmentController.getAppointmentByDriverID);


router.patch('/appointment/schedule/:id', verifyToken, appointmentController.updateAppointmentSchedule);

router.patch('/appointment/origin/:id', verifyToken, appointmentController.updateAppointmentOrigin);

router.patch('/appointment/destination/:id', verifyToken, appointmentController.updateAppointmentDestination);

router.patch('/appointment/add-driver/:id', verifyToken, appointmentController.addDriver);

router.patch('/appointment/remove-driver/:id', verifyToken, appointmentController.removeDriver);


router.delete('/appointment/:id', verifyToken, appointmentController.deleteAppointment);

module.exports = router;
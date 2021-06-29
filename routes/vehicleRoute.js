const router = require('express').Router();

const verifyToken = require('../middleware/verifyToken');
const vehicleController = require('../controllers/vehicleController');
const adminController = require('../controllers/adminController');


router.post('/vehicle', verifyToken, vehicleController.createVehicle);


router.get('/vehicle/:id', verifyToken, vehicleController.getVehicleByID);

router.get('/vehicle/license-plate/:id', verifyToken, vehicleController.getVehicleByLicensePlate);

router.get('/vehicle/driver-id/:id', verifyToken, vehicleController.getVehicleByDriverID);

router.get('/vehicle/owner-id/:id', verifyToken, vehicleController.getVehicleByOwnerID);

router.get('/vehicle', verifyToken, vehicleController.getAllVehicles);


router.put('/vehicle/:id', verifyToken, vehicleController.updateVehicle);


router.delete('/vehicle/:id', verifyToken, adminController.validate, vehicleController.deleteVehicle);

module.exports = router;
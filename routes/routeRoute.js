const router = require('express').Router();

const verifyToken = require('../middleware/verifyToken');
const routeController = require('../controllers/routeController');
const adminController = require('../controllers/adminController');

router.post('/route', verifyToken, routeController.createRoute);


router.get('/route/:id', verifyToken, routeController.getRoute);

router.get('/route', verifyToken, routeController.getAllRoutes);


router.put('/route/:id', verifyToken, routeController.updateRoute);


router.delete('/route/:id', verifyToken, adminController.validate, routeController.deleteRoute);


module.exports = router;
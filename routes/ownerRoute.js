const router = require('express').Router();

const verifyToken = require('../middleware/verifyToken');
const ownerController = require('../controllers/ownerController');
const adminController = require('../controllers/adminController');

router.post('/owner', verifyToken, ownerController.signUp);


router.get('/owner/:id', verifyToken, ownerController.getOwner);

router.get('/owner', verifyToken, ownerController.getAllOwners);


router.put('/owner/:id', verifyToken, ownerController.updateOwner);


router.delete('/owner/:id', verifyToken, adminController.validate, ownerController.deleteAccount);


module.exports = router;
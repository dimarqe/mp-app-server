const router = require('express').Router();

const verifyToken = require('../middleware/verifyToken');
const contractController = require('../controllers/contractController');
const adminController = require('../controllers/adminController');

router.post('/contract', verifyToken, contractController.createContract);


router.get('/contract/:id', verifyToken, contractController.getContract);

router.get('/contract', verifyToken, contractController.getAllContracts);


router.patch('/contract/due_date/:id', verifyToken, contractController.updateDueDate);

router.put('/contract/:id', verifyToken, contractController.updateContract);


router.delete('/contract/:id', verifyToken, adminController.validate, contractController.deleteContract);


module.exports = router;
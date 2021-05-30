const router = require('express').Router();

const verifyToken = require('../middleware/verifyToken');
const ownerController = require('../controllers/ownerController');


router.get('/owner', verifyToken, ownerController.getOwner);


router.post('/owner/signUp', verifyToken, ownerController.signUp);


//router.put('/owner/password', verifyToken, ownerController.updatePassword);


router.delete('/owner', verifyToken, ownerController.deleteAccount);


module.exports = router;
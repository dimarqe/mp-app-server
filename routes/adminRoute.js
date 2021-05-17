const router = require('express').Router();

const adminController = require('../controllers/adminController');
const verifyToken = require('../middleware/verifyToken');

router.post('/admin/validate', verifyToken, adminController.validate);

module.exports = router;
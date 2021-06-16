const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const AdminModel = require('../models/adminModel');

const adminController = {
    validate:
        async (req, res, next) => {
            if (req.user.role == "admin") {
                await body('adminPassword', 'Invalid password, 30 character limit').isLength({ min: 1 }, { max: 30 }).trim().escape().run(req);

                const reqErrors = validationResult(req);

                if (!reqErrors.isEmpty()) {
                    return res.status(400).json({
                        "error": true,
                        "message": reqErrors.array(),
                        "data": null
                    });
                }

                AdminModel.findByID(req.user.id, (err, doc) => {
                    if (err) {
                        return next(err);
                    }
                    else if (!doc || doc.length <= 0) {
                        return res.status(404).json({
                            "error": true,
                            "message": "Incorrect login credentials",
                            "data": null
                        });
                    }
                    else {
                        bcrypt.compare(req.body.adminPassword, doc.access_code, (err, result) => {
                            if (err) {
                                return next(err);
                            }
                            else if (result == true) {
                                next();
                            }
                            else {
                                return res.status(404).json({
                                    "error": true,
                                    "message": "Incorrect login credentials",
                                    "data": null
                                });
                            }
                        });
                    }
                });
            }
            else {
                return res.status(403).json({
                    "error": true,
                    "message": "Forbidden",
                    "data": null
                });
            }
        }
}


module.exports = adminController;
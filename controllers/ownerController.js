const { body, validationResult } = require('express-validator');
const Owner = require('../models/ownerModel');

const OwnerModel = require('../models/ownerModel');

const driverController = {

    //POST REQUESTS

    signUp:
        async (req, res, next) => {
            if (req.user.role == "admin") {
                //Validates data sent in request body
                await body('firstName', 'Invalid first name, 30 character limit').isLength({ min: 1 }, { max: 30 }).trim().escape().run(req);
                await body('lastName', 'Invalid last name, 30 character limit').isLength({ min: 1 }, { max: 30 }).trim().escape().run(req);
                await body('emailAddress', 'Invalid email address').isEmail().trim().escape().run(req);
                await body('phoneNumber', 'Invalid phone number, 15 number limit').isLength({ min: 7 }, { max: 15 }).trim().escape().run(req);

                const reqErrors = validationResult(req);

                //returns error information if invalid data contained in request body
                if (!reqErrors.isEmpty()) {
                    return res.status(400).json({
                        "error": true,
                        "message": reqErrors.array(),
                        "data": null
                    });
                }

                const newOwner = new OwnerModel({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    phoneNumber: req.body.phoneNumber,
                    emailAddress: req.body.emailAddress
                });

                OwnerModel.save(newOwner, (err, doc) => {
                    if (err) {
                        return next(err);
                    }
                    else {
                        return res.status(201).json({
                            "error": false,
                            "message": "Account successfully created",
                            "data": {
                                "email": doc
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
    ,
    //GET REQUESTS

    getOwner:
        async (req, res, next) => {
            if (req.user.role == "admin") {
                //Validates data sent in request body
                await body('ownerID', 'Invalid ID, must be integer').isInt().trim().escape().run(req);
                
                const reqErrors = validationResult(req);

                //returns error information if invalid data contained in request body
                if (!reqErrors.isEmpty()) {
                    return res.status(400).json({
                        "error": true,
                        "message": reqErrors.array(),
                        "data": null
                    });
                }

                OwnerModel.findByID(req.body.ownerID, (err, doc) => {
                    if (err) {
                        return next(err);
                    }
                    else if (!doc || doc.length == 0) {
                        return res.status(404).json({
                            "error": true,
                            "message": "Account not found",
                            "data": null
                        });
                    }
                    else {
                        return res.status(200).json({
                            "error": false,
                            "message": "Account successfully retrieved",
                            "data": doc
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
    ,

    //PATCH REQUESTS
    //admin update requests
    
    //DELETE REQUESTS
    deleteAccount:
        async(req, res, next) => {
            if (req.user.role == "admin") {
                //Validates data sent in request body
                await body('ownerID', 'Invalid ID, must be integer').isInt().trim().escape().run(req);
                
                const reqErrors = validationResult(req);

                //returns error information if invalid data contained in request body
                if (!reqErrors.isEmpty()) {
                    return res.status(400).json({
                        "error": true,
                        "message": reqErrors.array(),
                        "data": null
                    });
                }

                OwnerModel.delete(req.body.ownerID, (err, doc) => {
                    if (err) {
                        return next(err);
                    }
                    else if (doc.affectedRows >= 1) {
                        return res.status(200).json({
                            "error": false,
                            "message": "Account successfully deleted",
                            "data": null
                        });
                    }
                    else {
                        return res.status(500).json({
                            "error": true,
                            "message": "Error deleting account",
                            "data": null
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
    ,
}

module.exports = driverController;
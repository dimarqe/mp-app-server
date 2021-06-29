const { body, param, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const passwordGenerator = require('generate-password');

const DriverModel = require('../models/driverModel');

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

                try {
                    //generates random password string
                    var password = passwordGenerator.generate({
                        length: 8,
                        numbers: true
                    });

                    //hashes password before saving to db
                    var passwordHash = await bcrypt.hash(password, 10);
                } catch (error) {
                    return next(error);
                }

                const newDriver = new DriverModel({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    phoneNumber: req.body.phoneNumber,
                    emailAddress: req.body.emailAddress,
                    accessCode: passwordHash
                });

                DriverModel.save(newDriver, (err, doc) => {
                    if (err) {
                        return next(err);
                    }
                    else {
                        return res.status(201).json({
                            "error": false,
                            "message": "Account successfully created",
                            "data": {
                                "email": newDriver.emailAddress,
                                "id": doc.driver_id,
                                "password": password
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

    getDriver:
        async (req, res, next) => {
            //Validates data sent in request body
            await param('id', 'Invalid ID#, must be integer').isInt().trim().escape().run(req);

            const reqErrors = validationResult(req);

            //returns error information if invalid data contained in request body
            if (!reqErrors.isEmpty()) {
                return res.status(400).json({
                    "error": true,
                    "message": reqErrors.array(),
                    "data": null
                });
            }

            DriverModel.findByID(req.params.id, (err, doc) => {
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
                    doc.access_code = undefined;

                    return res.status(200).json({
                        "error": false,
                        "message": "Account successfully retrieved",
                        "data": doc
                    });
                }
            });
        }
    ,
    getAllDrivers:
        async (req, res, next) => {
            if (req.user.role == "admin") {

                DriverModel.findAll((err, doc) => {
                    if (err) {
                        return next(err);
                    }
                    else if (!doc || doc.length == 0) {
                        return res.status(404).json({
                            "error": true,
                            "message": "No records found",
                            "data": null
                        });
                    }
                    else {
                        for (let i = 0; i < doc.length; i++) {
                            doc[i].access_code = undefined;
                        }

                        return res.status(200).json({
                            "error": false,
                            "message": "Accounts successfully retrieved",
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

    updatePassword:
        async (req, res, next) => {
            if (req.user.role == "driver") {
                await body('newPassword', 'Invalid password, 30 character limit').isLength({ min: 1 }, { max: 30 }).trim().escape().run(req);
                await body('oldPassword', 'Invalid password, 30 character limit').isLength({ min: 1 }, { max: 30 }).trim().escape().run(req);

                const reqErrors = validationResult(req);

                if (!reqErrors.isEmpty()) {
                    return res.status(400).json({
                        "error": true,
                        "message": reqErrors.array(),
                        "data": null
                    });
                }

                try {
                    //hashes password before saving to db
                    var passwordHash = await bcrypt.hash(req.body.newPassword, 10);
                } catch (error) {
                    return next(error);
                }

                DriverModel.findByID(req.user.id, (err, doc) => {
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
                        bcrypt.compare(req.body.oldPassword, doc.access_code, (err, result) => {
                            if (err) {
                                return next(err);
                            }
                            else if (result == true) {
                                DriverModel.updatePassword(req.user.id, passwordHash, (err, doc) => {
                                    if (err) {
                                        return next(err);
                                    }
                                    else if (doc.rowCount >= 1) {
                                        return res.status(200).json({
                                            "error": false,
                                            "message": "Password successfully updated",
                                            "data": null
                                        });
                                    }
                                    else {
                                        return res.status(400).json({
                                            "error": true,
                                            "message": "Failed to update password",
                                            "data": null
                                        });
                                    }
                                });
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
    ,
    updatePhoneNumber:
        async (req, res, next) => {
            if (req.user.role == "driver") {
                await body('phoneNumber', 'Invalid phone number, 15 number limit').isLength({ min: 1 }, { max: 15 }).trim().escape().run(req);

                const reqErrors = validationResult(req);

                if (!reqErrors.isEmpty()) {
                    return res.status(400).json({
                        "error": true,
                        "message": reqErrors.array(),
                        "data": null
                    });
                }

                DriverModel.updatePhoneNumber(req.user.id, req.body.phoneNumber, (err, doc) => {
                    if (err) {
                        return next(err);
                    }
                    else if (doc.rowCount >= 1) {
                        return res.status(200).json({
                            "error": false,
                            "message": "Phone number successfully updated",
                            "data": null
                        });
                    }
                    else {
                        return res.status(400).json({
                            "error": true,
                            "message": "Failed to update phone number",
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
    updateEmailAddress:
        async (req, res, next) => {
            if (req.user.role == "driver") {
                await body('emailAddress', 'Invalid email address').isEmail().trim().escape().run(req);

                const reqErrors = validationResult(req);

                if (!reqErrors.isEmpty()) {
                    return res.status(400).json({
                        "error": true,
                        "message": reqErrors.array(),
                        "data": null
                    });
                }

                DriverModel.updateEmailAddress(req.user.id, req.body.emailAddress, (err, doc) => {
                    if (err) {
                        return next(err);
                    }
                    else if (doc.rowCount >= 1) {
                        return res.status(200).json({
                            "error": false,
                            "message": "Email address successfully updated",
                            "data": null
                        });
                    }
                    else {
                        return res.status(400).json({
                            "error": true,
                            "message": "Failed to update email address",
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

    //PUT REQUESTS
    //admin update request
    updateDriver:
        async (req, res, next) => {
            if (req.user.role == "admin") {
                //Validates data sent in request body
                await param('id', 'Invalid ID#, must be integer').isInt().trim().escape().run(req);
                await body('firstName', 'Invalid first name, 30 character limit').isLength({ min: 1 }, { max: 30 }).trim().escape().run(req);
                await body('lastName', 'Invalid last name, 30 character limit').isLength({ min: 1 }, { max: 30 }).trim().escape().run(req);
                await body('emailAddress', 'Invalid email address').isEmail().trim().escape().run(req);
                await body('phoneNumber', 'Invalid phone number, 15 number limit').isLength({ min: 7 }, { max: 15 }).trim().escape().run(req);
                await body('password', 'Invalid password, 30 character limit').isLength({ min: 1 }, { max: 30 }).trim().escape().run(req);

                const reqErrors = validationResult(req);

                //returns error information if invalid data contained in request body
                if (!reqErrors.isEmpty()) {
                    return res.status(400).json({
                        "error": true,
                        "message": reqErrors.array(),
                        "data": null
                    });
                }

                try {
                    //hashes password new password sent in request body
                    var passwordHash = await bcrypt.hash(req.body.password, 10);
                } catch (error) {
                    return next(error);
                }

                const newDriver = new DriverModel({
                    driverID: req.params.id,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    phoneNumber: req.body.phoneNumber,
                    emailAddress: req.body.emailAddress,
                    accessCode: passwordHash
                });

                DriverModel.updateDriver(newDriver, (err, doc) => {
                    if (err) {
                        return next(err);
                    }
                    else if (doc.rowCount >= 1) {
                        return res.status(200).json({
                            "error": false,
                            "message": "Account successfully updated",
                            "data": null
                        });
                    }
                    else {
                        return res.status(400).json({
                            "error": true,
                            "message": "Error updating account",
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

    //DELETE REQUESTS
    deleteAccount:
        async (req, res, next) => {
            if (req.user.role == "admin") {
                //Validates data sent in request body
                await param('id', 'Invalid ID#, must be integer').isInt().trim().escape().run(req);

                const reqErrors = validationResult(req);

                //returns error information if invalid data contained in request body
                if (!reqErrors.isEmpty()) {
                    return res.status(400).json({
                        "error": true,
                        "message": reqErrors.array(),
                        "data": null
                    });
                }

                DriverModel.delete(req.params.id, (err, doc) => {
                    if (err) {
                        return next(err);
                    }
                    else if (doc.rowCount >= 1) {
                        return res.status(200).json({
                            "error": false,
                            "message": "Account successfully deleted",
                            "data": null
                        });
                    }
                    else {
                        return res.status(400).json({
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
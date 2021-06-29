const { body, param, validationResult } = require('express-validator');

const AppointmentModel = require('../models/appointmentModel');

const vehicleController = {

    //POST REQUESTS

    createAppointment:
        async (req, res, next) => {
            if (req.user.role == "student") {
                //Validates data sent in request body
                await body('schedule', 'Invalid plate number').isLength({ min: 1 }, { max: 30 }).escape().run(req);
                await body('origin', 'Invalid owner id, must be integer').isString().trim().escape().run(req);
                await body('destination', 'Invalid driver id, must be integer').isString().trim().escape().run(req);

                const reqErrors = validationResult(req);

                //returns error information if invalid data contained in request body
                if (!reqErrors.isEmpty()) {
                    return res.status(400).json({
                        "error": true,
                        "message": reqErrors.array(),
                        "data": null
                    });
                }

                const newAppointment = new AppointmentModel({
                    schedule : req.body.schedule,
                    origin : req.body.origin,
                    destination : req.body.destination,
                    studentID : req.user.id
                });

                AppointmentModel.save(newAppointment, (err, doc) => {
                    if (err) {
                        return next(err);
                    }
                    else {
                        return res.status(201).json({
                            "error": false,
                            "message": "Appointment successfully created",
                            "data": {
                                "appointment_id": doc.appointment_id
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

    getAppointmentByID:
        async (req, res, next) => {
            //Validates data sent in request body
            await param('id', 'Invalid ID, must be integer').isInt().trim().escape().run(req);

            const reqErrors = validationResult(req);

            //returns error information if invalid data contained in request body
            if (!reqErrors.isEmpty()) {
                return res.status(400).json({
                    "error": true,
                    "message": reqErrors.array(),
                    "data": null
                });
            }

            AppointmentModel.findByID(req.params.id, (err, doc) => {
                if (err) {
                    return next(err);
                }
                else if (!doc || doc.length == 0) {
                    return res.status(404).json({
                        "error": true,
                        "message": "Appointment not found",
                        "data": null
                    });
                }
                else {
                    return res.status(200).json({
                        "error": false,
                        "message": "Appointment successfully retrieved",
                        "data": doc
                    });
                }
            });
        }
    ,
    getAppointmentByLicensePlate:
        async (req, res, next) => {
            //Validates data sent in request body
            await param('id', 'Invalid license plate number').isLength({ min: 1 }, { max: 8 }).trim().escape().run(req);

            const reqErrors = validationResult(req);

            //returns error information if invalid data contained in request body
            if (!reqErrors.isEmpty()) {
                return res.status(400).json({
                    "error": true,
                    "message": reqErrors.array(),
                    "data": null
                });
            }

            AppointmentModel.findByPlateNumber(req.params.id, (err, doc) => {
                if (err) {
                    return next(err);
                }
                else if (!doc || doc.length == 0) {
                    return res.status(404).json({
                        "error": true,
                        "message": "Appointment not found",
                        "data": null
                    });
                }
                else {
                    return res.status(200).json({
                        "error": false,
                        "message": "Appointment info successfully retrieved",
                        "data": doc
                    });
                }
            });
        }
    ,

    getAppointmentByDriverID:
        async (req, res, next) => {
            //Validates data sent in request body
            await param('id', 'Invalid ID, must be integer').isInt().trim().escape().run(req);

            const reqErrors = validationResult(req);

            //returns error information if invalid data contained in request body
            if (!reqErrors.isEmpty()) {
                return res.status(400).json({
                    "error": true,
                    "message": reqErrors.array(),
                    "data": null
                });
            }

            AppointmentModel.findByDriverID(req.params.id, (err, doc) => {
                if (err) {
                    return next(err);
                }
                else if (!doc || doc.length == 0) {
                    return res.status(404).json({
                        "error": true,
                        "message": "No vehicles found for driver " + req.params.id,
                        "data": null
                    });
                }
                else {
                    return res.status(200).json({
                        "error": false,
                        "message": "Records successfully retrieved",
                        "data": doc
                    });
                }
            });
        }
    ,

    getAppointmentByOwnerID:
        async (req, res, next) => {
            //Validates data sent in request body
            await param('id', 'Invalid ID, must be integer').isInt().trim().escape().run(req);

            const reqErrors = validationResult(req);

            //returns error information if invalid data contained in request body
            if (!reqErrors.isEmpty()) {
                return res.status(400).json({
                    "error": true,
                    "message": reqErrors.array(),
                    "data": null
                });
            }

            AppointmentModel.findByOwnerID(req.params.id, (err, doc) => {
                if (err) {
                    return next(err);
                }
                else if (!doc || doc.length == 0) {
                    return res.status(404).json({
                        "error": true,
                        "message": "No vehicles found for owner " + req.params.id,
                        "data": null
                    });
                }
                else {
                    return res.status(200).json({
                        "error": false,
                        "message": "Records successfully retrieved",
                        "data": doc
                    });
                }
            });
        }
    ,

    getAllAppointments:
        async (req, res, next) => {
            if (req.user.role == "admin") {

                AppointmentModel.findAll((err, doc) => {
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
                        return res.status(200).json({
                            "error": false,
                            "message": "Records successfully retrieved",
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
    updateAppointment:
        async (req, res, next) => {
            if (req.user.role == "admin") {
                //Validates data sent in request body
                await param('id', 'Invalid ID#, must be integer').isInt().trim().escape().run(req);
                await body('plateNumber', 'Invalid plate number').isLength({ min: 1 }, { max: 8 }).trim().escape().run(req);
                await body('ownerID', 'Invalid owner id, must be integer').isInt().trim().escape().run(req);
                await body('driverID', 'Invalid driver id, must be integer').isInt().trim().escape().run(req);
                await body('capacity', 'Invalid capacity, must be integer').isInt().trim().escape().run(req);
                await body('make', 'Invalid vehicle brand, 30 character limit').isLength({ min: 1 }, { max: 30 }).trim().escape().run(req);
                await body('model', 'Invalid vehicle model, 30 character limit').isLength({ min: 1 }, { max: 30 }).trim().escape().run(req);
                await body('colour', 'Invalid colour description, 20 character limit').isLength({ min: 1 }, { max: 20 }).trim().escape().run(req);

                const reqErrors = validationResult(req);

                //returns error information if invalid data contained in request body
                if (!reqErrors.isEmpty()) {
                    return res.status(400).json({
                        "error": true,
                        "message": reqErrors.array(),
                        "data": null
                    });
                }

                const newAppointment = new AppointmentModel({
                    vehicleID: req.params.id,
                    plateNumber: req.body.plateNumber,
                    ownerID: req.body.ownerID,
                    driverID: req.body.driverID,
                    capacity: req.body.capacity,
                    make: req.body.make,
                    model: req.body.model,
                    colour: req.body.colour
                });

                AppointmentModel.updateAppointment(newAppointment, (err, doc) => {
                    if (err) {
                        return next(err);
                    }
                    else if (doc.rowCount >= 1) {
                        return res.status(200).json({
                            "error": false,
                            "message": "Appointment record successfully updated",
                            "data": null
                        });
                    }
                    else {
                        return res.status(400).json({
                            "error": true,
                            "message": "Error updating vehicle record",
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
    deleteAppointment:
        async (req, res, next) => {
            if (req.user.role == "admin") {
                //Validates data sent in request body
                await param('id', 'Invalid ID, must be integer').isInt().trim().escape().run(req);

                const reqErrors = validationResult(req);

                //returns error information if invalid data contained in request body
                if (!reqErrors.isEmpty()) {
                    return res.status(400).json({
                        "error": true,
                        "message": reqErrors.array(),
                        "data": null
                    });
                }

                AppointmentModel.delete(req.params.id, (err, doc) => {
                    if (err) {
                        return next(err);
                    }
                    else if (doc.rowCount >= 1) {
                        return res.status(200).json({
                            "error": false,
                            "message": "Appointment successfully deleted",
                            "data": null
                        });
                    }
                    else {
                        return res.status(400).json({
                            "error": true,
                            "message": "Error deleting vehicle record",
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

module.exports = vehicleController;
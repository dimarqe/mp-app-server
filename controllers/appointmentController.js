const { body, param, validationResult } = require('express-validator');

const AppointmentModel = require('../models/appointmentModel');

const appointmentController = {

    //POST REQUESTS

    createAppointment:
        async (req, res, next) => {
            if (req.user.role == "student") {
                //Validates data sent in request body
                await body('schedule', 'Invalid plate number').isLength({ min: 1 }, { max: 30 }).trim().escape().run(req);
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
                    schedule: req.body.schedule,
                    origin: req.body.origin,
                    destination: req.body.destination,
                    studentID: req.user.id
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

    getAppointmentByDriverID:
        async (req, res, next) => {
            if (req.user.role == "driver" || req.user.role == "admin") {
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
                            "message": "No appointments found",
                            "data": null
                        });
                    }
                    else {
                        return res.status(200).json({
                            "error": false,
                            "message": "Appointments successfully retrieved",
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

    getAppointmentByStudentID:
        async (req, res, next) => {
            if (req.user.role == "student" || req.user.role == "admin") {
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

                AppointmentModel.findByStudentID(req.params.id, (err, doc) => {
                    if (err) {
                        return next(err);
                    }
                    else if (!doc || doc.length == 0) {
                        return res.status(404).json({
                            "error": true,
                            "message": "No appointments found",
                            "data": null
                        });
                    }
                    else {
                        return res.status(200).json({
                            "error": false,
                            "message": "Appointments successfully retrieved",
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
    updateAppointmentSchedule:
        async (req, res, next) => {
            if (req.user.role == "student") {
                //Validates data sent in request body
                await param('id', 'Invalid ID, must be integer').isInt().trim().escape().run(req);
                await body('schedule', 'Invalid plate number').isLength({ min: 1 }, { max: 30 }).trim().escape().run(req);

                const reqErrors = validationResult(req);

                //returns error information if invalid data contained in request body
                if (!reqErrors.isEmpty()) {
                    return res.status(400).json({
                        "error": true,
                        "message": reqErrors.array(),
                        "data": null
                    });
                }

                AppointmentModel.updateSchedule(req.body.schedule, req.params.id, req.user.id, (err, doc) => {
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
                            "message": "Error updating Appointment",
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
    updateAppointmentOrigin:
        async (req, res, next) => {
            if (req.user.role == "student") {
                //Validates data sent in request body
                await param('id', 'Invalid ID, must be integer').isInt().trim().escape().run(req);
                await body('origin', 'Invalid (x, y) co-ordinates').isString().trim().escape().run(req);

                const reqErrors = validationResult(req);

                //returns error information if invalid data contained in request body
                if (!reqErrors.isEmpty()) {
                    return res.status(400).json({
                        "error": true,
                        "message": reqErrors.array(),
                        "data": null
                    });
                }

                AppointmentModel.updateOrigin(req.body.origin, req.params.id, req.user.id, (err, doc) => {
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
                            "message": "Error updating Appointment",
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
    updateAppointmentDestination:
        async (req, res, next) => {
            if (req.user.role == "student") {
                //Validates data sent in request body
                await param('id', 'Invalid ID, must be integer').isInt().trim().escape().run(req);
                await body('destination', 'Invalid (x, y) co-ordinates').isString().trim().escape().run(req);

                const reqErrors = validationResult(req);

                //returns error information if invalid data contained in request body
                if (!reqErrors.isEmpty()) {
                    return res.status(400).json({
                        "error": true,
                        "message": reqErrors.array(),
                        "data": null
                    });
                }

                AppointmentModel.updateDestination(req.body.destination, req.params.id, req.user.id, (err, doc) => {
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
                            "message": "Error updating Appointment",
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
            if (req.user.role == "student") {
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

                AppointmentModel.delete(req.params.id, req.user.id, (err, doc) => {
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
                            "message": "Error deleting appointment",
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

module.exports = appointmentController;
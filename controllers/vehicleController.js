const { body, param, validationResult } = require('express-validator');

const VehicleModel = require('../models/vehicleModel');

const vehicleController = {

    //POST REQUESTS

    createVehicle:
        async (req, res, next) => {
            if (req.user.role == "admin") {
                //Validates data sent in request body
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

                const newVehicle = new VehicleModel({
                    plateNumber: req.body.plateNumber,
                    ownerID: req.body.ownerID,
                    driverID: req.body.driverID,
                    capacity: req.body.capacity,
                    make: req.body.make,
                    model: req.body.model,
                    colour: req.body.colour
                });

                VehicleModel.save(newVehicle, (err, doc) => {
                    if (err) {
                        return next(err);
                    }
                    else {
                        return res.status(201).json({
                            "error": false,
                            "message": "Account successfully created",
                            "data": {
                                "vehicle_id":doc.vehicle_id
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

    getVehicleByID:
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

            VehicleModel.findByID(req.params.id, (err, doc) => {
                if (err) {
                    return next(err);
                }
                else if (!doc || doc.length == 0) {
                    return res.status(404).json({
                        "error": true,
                        "message": "Vehicle not found",
                        "data": null
                    });
                }
                else {
                    return res.status(200).json({
                        "error": false,
                        "message": "Vehicle successfully retrieved",
                        "data": doc
                    });
                }
            });
        }
    ,
    getVehicleByLicensePlate:
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

            VehicleModel.findByPlateNumber(req.params.id, (err, doc) => {
                if (err) {
                    return next(err);
                }
                else if (!doc || doc.length == 0) {
                    return res.status(404).json({
                        "error": true,
                        "message": "Vehicle not found",
                        "data": null
                    });
                }
                else {
                    return res.status(200).json({
                        "error": false,
                        "message": "Vehicle info successfully retrieved",
                        "data": doc
                    });
                }
            });
        }
    ,

    getVehicleByDriverID:
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

            VehicleModel.findByDriverID(req.params.id, (err, doc) => {
                if (err) {
                    return next(err);
                }
                else if (!doc || doc.length == 0) {
                    return res.status(404).json({
                        "error": true,
                        "message": "No vehicles found for driver "+req.params.id,
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

    getVehicleByOwnerID:
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

            VehicleModel.findByOwnerID(req.params.id, (err, doc) => {
                if (err) {
                    return next(err);
                }
                else if (!doc || doc.length == 0) {
                    return res.status(404).json({
                        "error": true,
                        "message": "No vehicles found for owner "+req.params.id,
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

    getAllVehicles:
        async (req, res, next) => {
            if (req.user.role == "admin") {

                VehicleModel.findAll((err, doc) => {
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
    updateVehicle:
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

                const newVehicle = new VehicleModel({
                    vehicleID: req.params.id,
                    plateNumber: req.body.plateNumber,
                    ownerID: req.body.ownerID,
                    driverID: req.body.driverID,
                    capacity: req.body.capacity,
                    make: req.body.make,
                    model: req.body.model,
                    colour: req.body.colour
                });

                VehicleModel.updateVehicle(newVehicle, (err, doc) => {
                    if (err) {
                        return next(err);
                    }
                    else if (doc.rowCount >= 1) {
                        return res.status(200).json({
                            "error": false,
                            "message": "Vehicle record successfully updated",
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
    deleteVehicle:
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

                VehicleModel.delete(req.params.id, (err, doc) => {
                    if (err) {
                        return next(err);
                    }
                    else if (doc.rowCount >= 1) {
                        return res.status(200).json({
                            "error": false,
                            "message": "Vehicle successfully deleted",
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
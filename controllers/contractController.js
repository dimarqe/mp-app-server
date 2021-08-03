const { body, param, validationResult } = require('express-validator');

const ContractModel = require('../models/contractModel');

const contractContract = {

    //POST REQUESTS

    createContract:
        async (req, res, next) => {
            if (req.user.role == "admin") {
                //Validates data sent in request body
                await body('contractNumber', 'Invalid contract number, 30 character limit').isLength({ min: 1 }, { max: 30 }).trim().escape().run(req);
                await body('prNumber', 'Invalid pr number, 30 character limit').isLength({ min: 1 }, { max: 30 }).trim().escape().run(req);
                await body('procurementOfficer', 'Invalid procurement officer name, 100 character limit').isLength({ min: 1 }, { max: 100 }).trim().escape().run(req);
                await body('contractor', 'Invalid contractor description, 255 character limit').isLength({ min: 0 }, { max: 255 }).trim().escape().run(req);
                await body('issueDate', 'Invalid issue date').isLength({ min: 1 }, { max: 100 }).trim().escape().run(req);
                await body('expirationDate', 'Invalid expiration date').isLength({ min: 1 }, { max: 100 }).trim().escape().run(req);
                await body('dueDate', 'Invalid balance due date').isLength({ min: 1 }, { max: 100 }).trim().escape().run(req);
                await body('routeID', 'Invalid route ID, must be integer').isInt().trim().escape().run(req);
                await body('vehicleID', 'Invalid vehicle ID, must be integer').isInt().trim().escape().run(req);
                await body('ownerID', 'Invalid owner ID, must be integer').isInt().trim().escape().run(req);


                const reqErrors = validationResult(req);

                //returns error information if invalid data contained in request body
                if (!reqErrors.isEmpty()) {
                    return res.status(400).json({
                        "error": true,
                        "message": reqErrors.array(),
                        "data": null
                    });
                }

                const newContract = new ContractModel({
                    contractNumber : req.body.contractNumber,
                    prNumber : req.body.prNumber,
                    procurementOfficer : req.body.procurementOfficer,
                    contractor : req.body.contractor,
                    issueDate : req.body.issueDate,
                    expirationDate : req.body.expirationDate,
                    dueDate : req.body.dueDate,
                    routeID : req.body.routeID,
                    vehicleID : req.body.vehicleID,
                    ownerID : req.body.ownerID,
                });

                ContractModel.save(newContract, (err, doc) => {
                    if (err) {
                        return next(err);
                    }
                    else {
                        return res.status(201).json({
                            "error": false,
                            "message": "Contract successfully created",
                            "data": {
                                "contract_id": doc.contract_id
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

    getContract:
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

                ContractModel.findByID(req.params.id, (err, doc) => {
                    if (err) {
                        return next(err);
                    }
                    else if (!doc || doc.length == 0) {
                        return res.status(404).json({
                            "error": true,
                            "message": "Contract not found",
                            "data": null
                        });
                    }
                    else {
                        return res.status(200).json({
                            "error": false,
                            "message": "Contract successfully retrieved",
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

    getAllContracts:
        async (req, res, next) => {
            if (req.user.role == "admin") {

                ContractModel.findAll((err, doc) => {
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
                            "message": "Contracts successfully retrieved",
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
    updateContract:
        async (req, res, next) => {
            if (req.user.role == "admin") {
                //Validates data sent in request body
                await param('id', 'Invalid ID#, must be integer').isInt().trim().escape().run(req);
                await body('contractNumber', 'Invalid contract number, 30 character limit').isLength({ min: 1 }, { max: 30 }).trim().escape().run(req);
                await body('prNumber', 'Invalid pr number, 30 character limit').isLength({ min: 1 }, { max: 30 }).trim().escape().run(req);
                await body('procurementOfficer', 'Invalid procurement officer name, 100 character limit').isLength({ min: 1 }, { max: 100 }).trim().escape().run(req);
                await body('contractor', 'Invalid contractor description, 255 character limit').isLength({ min: 0 }, { max: 255 }).trim().escape().run(req);
                await body('issueDate', 'Invalid issue date').isLength({ min: 1 }, { max: 100 }).trim().escape().run(req);
                await body('expirationDate', 'Invalid expiration date').isLength({ min: 1 }, { max: 100 }).trim().escape().run(req);
                await body('dueDate', 'Invalid balance due date').isLength({ min: 1 }, { max: 100 }).trim().escape().run(req);
                await body('routeID', 'Invalid route ID, must be integer').isInt().trim().escape().run(req);
                await body('vehicleID', 'Invalid vehicle ID, must be integer').isInt().trim().escape().run(req);
                await body('ownerID', 'Invalid owner ID, must be integer').isInt().trim().escape().run(req);

                const reqErrors = validationResult(req);

                //returns error information if invalid data contained in request body
                if (!reqErrors.isEmpty()) {
                    return res.status(400).json({
                        "error": true,
                        "message": reqErrors.array(),
                        "data": null
                    });
                }

                const newContract = new ContractModel({
                    contractID: req.params.id,
                    contractNumber : req.body.contractNumber,
                    prNumber : req.body.prNumber,
                    procurementOfficer : req.body.procurementOfficer,
                    contractor : req.body.contractor,
                    issueDate : req.body.issueDate,
                    expirationDate : req.body.expirationDate,
                    dueDate : req.body.dueDate,
                    routeID : req.body.routeID,
                    vehicleID : req.body.vehicleID,
                    ownerID : req.body.ownerID,
                });

                ContractModel.updateContract(newContract, (err, doc) => {
                    if (err) {
                        return next(err);
                    }
                    else if (doc.rowCount >= 1) {
                        return res.status(200).json({
                            "error": false,
                            "message": "Contract successfully updated",
                            "data": null
                        });
                    }
                    else {
                        return res.status(400).json({
                            "error": true,
                            "message": "Error updating contract",
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
    updateDueDate:
        async (req, res, next) => {
            if (req.user.role == "admin") {
                //Validates data sent in request body
                await param('id', 'Invalid ID#, must be integer').isInt().trim().escape().run(req);
                await body('dueDate', 'Invalid description, 100 character limit').isLength({ min: 1 }, { max: 100 }).trim().escape().run(req);
               
                const reqErrors = validationResult(req);

                //returns error information if invalid data contained in request body
                if (!reqErrors.isEmpty()) {
                    return res.status(400).json({
                        "error": true,
                        "message": reqErrors.array(),
                        "data": null
                    });
                }

                ContractModel.updateDueDate(req.params.id, req.body.dueDate, (err, doc) => {
                    if (err) {
                        return next(err);
                    }
                    else if (doc.rowCount >= 1) {
                        return res.status(200).json({
                            "error": false,
                            "message": "Contract successfully updated",
                            "data": null
                        });
                    }
                    else {
                        return res.status(400).json({
                            "error": true,
                            "message": "Error updating contract",
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
    deleteContract:
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

                ContractModel.delete(req.params.id, (err, doc) => {
                    if (err) {
                        return next(err);
                    }
                    else if (doc.rowCount >= 1) {
                        return res.status(200).json({
                            "error": false,
                            "message": "Contract successfully deleted",
                            "data": null
                        });
                    }
                    else {
                        return res.status(400).json({
                            "error": true,
                            "message": "Error deleting contract",
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

module.exports = contractContract;
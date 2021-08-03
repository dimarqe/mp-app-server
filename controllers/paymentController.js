const { body, param, validationResult } = require('express-validator');

const PaymentModel = require('../models/paymentModel');
const ContractModel = require('../models/contractModel');

const paymentPayment = {

    //POST REQUESTS

    createPayment:
        async (req, res, next) => {
            if (req.user.role == "admin") {
                //Validates data sent in request body
                await body('paymentType', 'Payment type must be either charge or deposit').isIn(["deposit","charge"]).trim().escape().run(req);
                await body('doneBy', 'Invalid payer, 60 character limit').isLength({ min: 1 }, { max: 30 }).trim().escape().run(req);
                await body('description', 'Invalid description, 255 character limit').isLength({ min: 0 }, { max: 255 }).trim().escape().run(req);
                await body('amount', 'Invalid payment, must be in 1.00 - 1,000,000.00 range').isFloat({min:1 , max:1000000}).trim().escape().run(req);
                await body('contractID', 'Invalid contract ID, must be integer').isInt().trim().escape().run(req);

                const reqErrors = validationResult(req);

                //returns error information if invalid data contained in request body
                if (!reqErrors.isEmpty()) {
                    return res.status(400).json({
                        "error": true,
                        "message": reqErrors.array(),
                        "data": null
                    });
                }

                ContractModel.findByID(req.body.contractID, (err, doc) => {
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
                        var newBalance = 0;
                        if(req.body.paymentType == "deposit"){
                            newBalance = parseFloat(doc.balance) - parseFloat(req.body.amount);
                        }
                        else{
                            newBalance = parseFloat(doc.balance) + parseFloat(req.body.amount);
                        }
                        console.log(req.body.amount);
                        console.log(newBalance);
                        console.log(doc.balance);

                        const newPayment = new PaymentModel({
                            paymentType: req.body.paymentType,
                            doneBy: req.body.doneBy,
                            description: req.body.description,
                            reducingBalance: newBalance,
                            priorBalance: doc.balance,
                            amount: req.body.amount,
                            contractID: req.body.contractID,
                            adminID: req.user.id
                        });
        
                        PaymentModel.save(newPayment, (err, doc) => {
                            if (err) {
                                return next(err);
                            }
                            else {
                                return res.status(201).json({
                                    "error": false,
                                    "message": "Payment successfully made",
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
    //GET REQUESTS

    getPaymentByID:
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

                PaymentModel.findByPaymentID(req.params.id, (err, doc) => {
                    if (err) {
                        return next(err);
                    }
                    else if (!doc || doc.length == 0) {
                        return res.status(404).json({
                            "error": true,
                            "message": "Payment not found",
                            "data": null
                        });
                    }
                    else {
                        return res.status(200).json({
                            "error": false,
                            "message": "Payment successfully retrieved",
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
    getPaymentByAdminID:
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

                PaymentModel.findByAdminID(req.params.id, (err, doc) => {
                    if (err) {
                        return next(err);
                    }
                    else if (!doc || doc.length == 0) {
                        return res.status(404).json({
                            "error": true,
                            "message": "No payments processed with that admin account",
                            "data": null
                        });
                    }
                    else {
                        return res.status(200).json({
                            "error": false,
                            "message": "Payments successfully retrieved",
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

    getAllCharges:
        async (req, res, next) => {
            if (req.user.role == "admin") {

                PaymentModel.findAllCharges((err, doc) => {
                    if (err) {
                        return next(err);
                    }
                    else if (!doc || doc.length == 0) {
                        return res.status(404).json({
                            "error": true,
                            "message": "No payment charges found",
                            "data": null
                        });
                    }
                    else {
                        return res.status(200).json({
                            "error": false,
                            "message": "Payment charges successfully retrieved",
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
    getAllDeposits:
        async (req, res, next) => {
            if (req.user.role == "admin") {

                PaymentModel.findAllDeposits((err, doc) => {
                    if (err) {
                        return next(err);
                    }
                    else if (!doc || doc.length == 0) {
                        return res.status(404).json({
                            "error": true,
                            "message": "No payment deposits found",
                            "data": null
                        });
                    }
                    else {
                        return res.status(200).json({
                            "error": false,
                            "message": "Payment deposits successfully retrieved",
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
}

module.exports = paymentPayment;
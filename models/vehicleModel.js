const pool = require('../config/dbConnection');

class Vehicle {
    constructor(vehicle) {
        this.vehicleID = vehicle.vehicleID;
        this.plateNumber = vehicle.plateNumber;
        this.capacity = vehicle.capacity;
        this.make = vehicle.make;
        this.model = vehicle.model;
        this.colour = vehicle.colour;
        this.ownerID = vehicle.ownerID;
        this.driverID = vehicle.driverID;
    }

    save(vehicle, result){
        pool.query("insert into vehicle values ?", vehicle, (err, doc) => {
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc);
            }
        });
    }

    static findByID(vehicleID, result){
        pool.query("select * from vehicle where vehicle_id = ? limit 1", vehicleID, (err, doc)=>{
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc[0]);
            }
        });
    }

    static findByPlateNumber(plateNumber, result){
        pool.query("select * from vehicle where plate_number = ? limit 1", plateNumber, (err, doc)=>{
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc[0]);
            }
        });
    }

    static findByDriverID(driverID, result){
        pool.query("select * from vehicle where driver_id = ?", driverID, (err, doc)=>{
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc[0]);
            }
        });
    }

    static findByOwnerID(ownerID, result){
        pool.query("select * from vehicle where owner_id = ?", ownerID, (err, doc)=>{
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc[0]);
            }
        });
    }

    static updateVehicle(vehicle, result){
        pool.query
        ("update vehicle set plate_number = ?, capacity = ?, make = ?, model = ?, colour = ?, owner_id = ?, driver_id = ? where vehicle_id = ?", 
        [vehicle.plateNumber, vehicle.capacity, vehicle.make, vehicle.model, vehicle.colour, vehicle.ownerID, vehicle.driverID, vehicle.vehicleID], 
        (err, doc)=>{
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc);
            }
        });
    }

    static delete(vehicleID, result){
        pool.query("delete from vehicle where vehicle_id = ? limit 1", vehicleID, (err, doc) => {
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc);
            }
        });
    }
}

module.exports = Vehicle;
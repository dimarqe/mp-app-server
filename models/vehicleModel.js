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

    static save(vehicle, result){
        pool.query("insert into vehicle (plate_number, capacity, make, model, colour, owner_id, driver_id) values ($1, $2, $3, $4, $5, $6, $7)", 
        [vehicle.plateNumber, vehicle.capacity, vehicle.make, vehicle.model, vehicle.colour, vehicle.ownerID, vehicle.driverID], 
        (err, doc) => {
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc);
            }
        });
    }

    static findByID(vehicleID, result){
        pool.query("select * from vehicle where vehicle_id = $1", [vehicleID], (err, doc)=>{
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc.rows[0]);
            }
        });
    }

    static findByPlateNumber(plateNumber, result){
        pool.query("select * from vehicle where plate_number = $1", [plateNumber], (err, doc)=>{
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc.rows[0]);
            }
        });
    }

    static findByDriverID(driverID, result){
        pool.query("select * from vehicle where driver_id = $1", [driverID], (err, doc)=>{
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc.rows);
            }
        });
    }

    static findByOwnerID(ownerID, result){
        pool.query("select * from vehicle where owner_id = $1", [ownerID], (err, doc)=>{
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc.rows);
            }
        });
    }

    static updateVehicle(vehicle, result){
        pool.query("update vehicle set plate_number = $1, capacity = $2, make = $3, model = $4, colour = $5, owner_id = $6, driver_id = $7 where vehicle_id = $8", 
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
        pool.query("delete from vehicle where vehicle_id = $1", [vehicleID], (err, doc) => {
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
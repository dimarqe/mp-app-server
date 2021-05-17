const pool = require('../config/dbConnection');

class Driver {
    constructor(driver) {
        this.driverID = driver.driverID;
        this.firstName = driver.firstName;
        this.lastName = driver.lastName;
        this.phoneNumber = driver.phoneNumber;
        this.emailAddress = driver.emailAddress;
        this.accessCode = driver.accessCode;     
    }

    static save(driver, result){
        pool.query("insert into driver set ?", driver, (err, doc) => {
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc);
            }
        });
    }

    static findByID(driverID, result){
        pool.query("select * from driver where driver_id = ? limit 1", driverID, (err, doc)=>{
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc[0]);
            }
        });
    }

    static findByEmail(emailAddress, result){
        pool.query("select * from driver where emailAddress = ? limit 1", emailAddress, (err, doc)=>{
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc[0]);
            }
        });
    }

    static updatePassword(driverID, password, result){
        pool.query("update driver set access_code = ? where driver_id = ?", [password, driverID], (err, doc)=>{
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc);
            }
        });
    }

    static updateDriver(driver, result){
        pool.query("update driver set first_name = ?, last_name = ?, email_address = ?, phone_number = ? where driver_id = ?", 
        [driver.firstName, driver.lastName, driver.emailAddress, driver.phoneNumber, driver.driverID], (err, doc)=>{
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc);
            }
        });
    }

    static delete(driverID, result){
        pool.query("delete from driver where driver_id = ? limit 1", driverID, (err, doc) => {
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc);
            }
        });
    }
}

module.exports = Driver;
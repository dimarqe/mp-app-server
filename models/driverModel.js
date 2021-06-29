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

    ///use insert ID for pg, change owner too btw
    static save(driver, result) {
        pool.query("insert into driver (first_name, last_name, phone_number, email_address, access_code) values ($1, $2, $3, $4, $5) returning driver_id",
            [driver.firstName, driver.lastName, driver.phoneNumber, driver.emailAddress, driver.accessCode],
            (err, doc) => {
                if (err) {
                    result(err, null);
                }
                else {
                    result(null, doc.rows[0]);
                }
            });
    }

    static findByID(driverID, result) {
        pool.query("select * from driver where driver_id = $1", [driverID], (err, doc) => {
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc.rows[0]);
            }
        });
    }

    static findAll(result) {
        pool.query("select * from driver", (err, doc) => {
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc.rows);
            }
        });
    }

    static updatePhoneNumber(driverID, phoneNumber, result) {
        pool.query("update driver set phone_number = $1 where driver_id = $2", [phoneNumber, driverID], (err, doc) => {
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc);
            }
        });
    }

    static updateEmailAddress(driverID, emailAddress, result) {
        pool.query("update driver set email_address = $1 where driver_id = $2", [emailAddress, driverID], (err, doc) => {
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc);
            }
        });
    }

    static updatePassword(driverID, password, result) {
        pool.query("update driver set access_code = $1 where driver_id = $2", [password, driverID], (err, doc) => {
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc);
            }
        });
    }

    static updateDriver(driver, result) {
        pool.query("update driver set first_name = $1, last_name = $2, email_address = $3, phone_number = $4, access_code = $5 where driver_id = $6",
            [driver.firstName, driver.lastName, driver.emailAddress, driver.phoneNumber, driver.accessCode, driver.driverID], (err, doc) => {
                if (err) {
                    result(err, null);
                }
                else {
                    result(null, doc);
                }
            });
    }

    static delete(driverID, result) {
        pool.query("delete from driver where driver_id = $1", [driverID], (err, doc) => {
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
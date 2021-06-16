const pool = require('../config/dbConnection');

class Owner {
    constructor(owner) {
        this.ownerID = owner.ownerID;
        this.firstName = owner.firstName;
        this.lastName = owner.lastName;
        this.phoneNumber = owner.phoneNumber;
        this.emailAddress = owner.emailAddress;
    }

    static save(owner, result) {
        pool.query("insert into vehicle_owner (first_name, last_name, phone_number, email_address) values ($1, $2, $3, $4) returning owner_id",
            [owner.firstName, owner.lastName, owner.phoneNumber, owner.emailAddress], (err, doc) => {
                if (err) {
                    result(err, null);
                }
                else {
                    result(null, doc.rows[0]);
                }
            });
    }

    static findByID(ownerID, result) {
        pool.query("select * from vehicle_owner where owner_id = $1", [ownerID], (err, doc) => {
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc.rows[0]);
            }
        });
    }

    static updateOwner(owner, result) {
        pool.query("update vehicle_owner set first_name = $1, last_name = $2, email_address = $3, phone_number = $4 where owner_id = $5",
            [owner.firstName, owner.lastName, owner.emailAddress, owner.phoneNumber, owner.ownerID], (err, doc) => {
                if (err) {
                    result(err, null);
                }
                else {
                    result(null, doc);
                }
            });
    }

    static delete(ownerID, result) {
        pool.query("delete from vehicle_owner where owner_id = $1", [ownerID], (err, doc) => {
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc);
            }
        });
    }
}

module.exports = Owner;
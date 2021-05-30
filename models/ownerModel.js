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
        pool.query("insert into vehicle_owner (first_name, last_name, phone_number, email_address) values (?,?,?,?)",
            owner.firstName, owner.lastName, owner.phoneNumber, owner.emailAddress,
            (err, doc) => {
                if (err) {
                    result(err, null);
                }
                else {
                    result(null, doc);
                }
            });
    }

    static findByID(ownerID, result) {
        pool.query("select * from vehicle_owner where owner_id = ? limit 1", ownerID, (err, doc) => {
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc[0]);
            }
        });
    }

    static updateOwner(owner, result) {
        pool.query("update vehicle_owner set first_name = ?, last_name = ?, email_address = ?, phone_number = ? where owner_id = ?",
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
        pool.query("delete from vehicle_owner where owner_id = ? limit 1", ownerID, (err, doc) => {
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
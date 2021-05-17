const pool = require('../config/dbConnection');

class Owner {
    constructor(owner) {
        this.ownerID = owner.ownerID;
        this.firstName = owner.firstName;
        this.lastName = owner.lastName;
        this.emailAddress = owner.emailAddress;
        this.phoneNumber = owner.phoneNumber;
    }

    static save(owner, result){
        pool.query("insert into vehicle_owner set ?", owner, (err, doc) => {
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc);
            }
        });
    }

    static findByID(ownerID, result){
        pool.query("select * from vehicle_owner where owner_id = ? limit 1", ownerID, (err, doc)=>{
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc[0]);
            }
        });
    }

    static updateOwner(owner, result){
        pool.query("update vehicle_owner set first_name = ?, last_name = ?, email_address = ?, phone_number = ? where driverID = ?", 
        [owner.firstName, owner.lastName, owner.emailAddress, owner.phoneNumber, owner.ownerID], (err, doc)=>{
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc);
            }
        });
    }
    
    static delete(ownerID, result){
        //check to make sure that LIMIT 1 would work as a part of this query
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
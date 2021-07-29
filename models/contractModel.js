const pool = require('../config/dbConnection');

/*
contract_number varchar(30) not null,
	pr_number varchar(30) not null,
	procurement_officer varchar(60) not null,
	contractor varchar(255),
	issue_date date not null,
	expiration_date date not null,
	balance numeric(9, 2) not null,
	due_date date not null,
	route_id int not null,
	vehicle_id int not null,
	owner_id int not null,
	
	foreign key (route_id) references route,
	foreign key (vehicle_id) references vehicle,
	foreign key (owner_id) references vehicle_owner,
	
	primary key (owner_id, vehicle_id)
*/
class Contract {
    constructor(contract) {
        this.contractNumber = contract.contractNumber;
        this.prNumber = contract.prNumber;
        this.procurementOfficer = contract.procurementOfficer;
        this.contractor = contract.contractor;
        this.issueDate = contract.issueDate;
        this.expirationDate = contract.expirationDate;
        this.balance = contract.balance;
        this.dueDate = contract.dueDate;
        this.routeID = contract.routeID;
        this.vehicleID = contract.vehicleID;
        this.ownerID = contract.ownerID;
    }

    static save(contract, result) {
        pool.query("insert into contract (description, fee) values ($1, $2) returning contract_id",
            [contract.description, contract.fee], (err, doc) => {
                if (err) {
                    result(err, null);
                }
                else {
                    result(null, doc.rows[0]);
                }
            });
    }

    static findByID(contractID, result) {
        pool.query("select * from contract where contract_id = $1", [contractID], (err, doc) => {
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc.rows[0]);
            }
        });
    }

    static findAll(result) {
        pool.query("select * from contract order by contract_id asc", (err, doc) => {
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc.rows);
            }
        });
    }

    static updateContract(contract, result) {
        pool.query("update contract set description = $1, fee = $2 where contract_id = $3",
            [contract.description, contract.fee, contract.contractID], (err, doc) => {
                if (err) {
                    result(err, null);
                }
                else {
                    result(null, doc);
                }
            });
    }

    static delete(contractID, result) {
        pool.query("delete from contract where contract_id = $1", [contractID], (err, doc) => {
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc);
            }
        });
    }
}

module.exports = Contract;
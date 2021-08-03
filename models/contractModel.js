const pool = require('../config/dbConnection');

class Contract {
    constructor(contract) {
        this.contractID = contract.contractID
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
        pool.query("insert into contract (contract_number, pr_number, procurement_officer, contractor, issue_date, expiration_date, due_date, route_id, owner_id, vehicle_id) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning contract_id",
            [contract.contractNumber, contract.prNumber, contract.procurementOfficer, 
                contract.contractor, contract.issueDate, contract.expirationDate, 
                contract.dueDate, contract.routeID, contract.ownerID, contract.vehicleID], (err, doc) => {
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
        pool.query("update contract set contract_number = $1, pr_number = $2, procurement_officer = $3, contractor = $4, issue_date = $5, expiration_date = $6, due_date = $7, route_id = $8, owner_id = $9, vehicle_id = $10 where contract_id = $11",
        [contract.contractNumber, contract.prNumber, contract.procurementOfficer, 
            contract.contractor, contract.issueDate, contract.expirationDate, 
            contract.dueDate, contract.routeID, contract.ownerID, contract.vehicleID, contract.contractID], (err, doc) => {
                if (err) {
                    result(err, null);
                }
                else {
                    result(null, doc);
                }
            });
    }

    static updateDueDate(contractID, dueDate, result) {
        pool.query("update contract set due_date = $1 where contract_id = $2",
        [dueDate, contractID], (err, doc) => {
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
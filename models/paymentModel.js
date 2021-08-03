const pool = require('../config/dbConnection');

class Payment {

    /*
    payment_type varchar(10) not null,
    done_by varchar(60) not null,
    description varchar(255),
    reducing_balance numeric(9, 2) not null,
    proir_balance numeric(9, 2) not null,
    amount numeric(9, 2) not null,
    processed_on date not null,
    contract_id int not null,
    admin_id int not null
    */
    constructor(payment) {
        this.paymentType = payment.paymentType
        this.doneBy = payment.doneBy;
        this.description = payment.description;
        this.reducingBalance = payment.reducingBalance;
        this.priorBalance = payment.priorBalance;
        this.amount = payment.amount;
        this.contractID = payment.contractID;
        this.adminID = payment.adminID;
    }

    static async save(payment, result) {
        var err;

        try {
            await pool.query('BEGIN')

            await pool.query("insert into payment (payment_type, done_by, description, reducing_balance, proir_balance, amount, processed_on, contract_id, admin_id) values ($1, $2, $3, $4, $5, $6, current_date, $7, $8)",
                [payment.paymentType, payment.doneBy, payment.description,
                payment.reducingBalance, payment.priorBalance, payment.amount,
                payment.contractID, payment.adminID])

            await pool.query("update contract set balance = $1 where contract_id = $2", [payment.reducingBalance, payment.contractID]);

            await pool.query('COMMIT')
        } catch (e) {
            await pool.query('ROLLBACK')
            err = e;
        } finally {
            result(err, null);
        }
    }

    static findByPaymentID(paymentID, result) {
        pool.query("select * from payment where payment_id = $1", [paymentID], (err, doc) => {
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc.rows[0]);
            }
        });
    }

    static findByAdminID(adminID, result) {
        pool.query("select * from payment where admin_id = $1", [adminID], (err, doc) => {
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc.rows);
            }
        });
    }

    static findAllCharges(result) {
        pool.query("select * from payment where payment_type = 'charge' order by payment_id asc", (err, doc) => {
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc.rows);
            }
        });
    }

    static findAllDeposits(result) {
        pool.query("select * from payment where payment_type = 'deposit' order by payment_id asc", (err, doc) => {
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc.rows);
            }
        });
    }
}

module.exports = Payment;
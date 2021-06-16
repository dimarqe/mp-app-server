const pool = require('../config/dbConnection');

class Appointment {
    constructor(appointment) {
        this.appointmentID = appointment.appointmentID;
        this.schedule = appointment.schedule;
        this.origin = appointment.origin;
        this.destination = appointment.destination;
        this.studentID = appointment.studentID;
        this.driverID = appointment.driverID;
    }

    static save(appointment, result) {
        pool.query("insert into appointment (schedule, origin, destination, student_id) values ($1, $2, $3, $4)",
            [appointment.schedule, appointment.origin, appointment.destination, appointment.studentID], (err, doc) => {
                if (err) {
                    result(err, null);
                }
                else {
                    result(null, doc);
                }
            });
    }

    static findByID(appointmentID, result) {
        pool.query("select * from appointment where appointment_id = $1", [appointmentID], (err, doc) => {
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc.rows[0]);
            }
        });
    }

    static findByStudentID(studentID, result) {
        pool.query("select * from appointment where student_id = $1", [studentID], (err, doc) => {
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc.rows);
            }
        });
    }

    static findByDriverID(driverID, result) {
        pool.query("select * from appointment where driver_id = $1", [driverID], (err, doc) => {
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc.rows);
            }
        });
    }

    static updateSchedule(schedule, appointmentID, studentID, result) {
        pool.query("update appointment set appointment_schedule = $1 where appointment_id = $2 and student_id = $3",
            [schedule, appointmentID, studentID], (err, doc) => {
                if (err) {
                    result(err, null);
                }
                else {
                    result(null, doc);
                }
            });
    }

    static updateOrigin(origin, appointmentID, studentID, result) {
        pool.query("update appointment set origin = $1 where appointment_id = $2 and student_id = $3",
            [origin, appointmentID, studentID], (err, doc) => {
                if (err) {
                    result(err, null);
                }
                else {
                    result(null, doc);
                }
            });
    }

    static updateDestination(destination, appointmentID, studentID, result) {
        pool.query("update appointment set destination = $1 where appointment_id = $2 and student_id = $3",
            [destination, appointmentID, studentID], (err, doc) => {
                if (err) {
                    result(err, null);
                }
                else {
                    result(null, doc);
                }
            });
    }

    static updateDriver(driverID, appointmentID, result) {
        pool.query("update appointment set driver_id = $1 where appointment_id = $2",
            [driverID, appointmentID], (err, doc) => {
                if (err) {
                    result(err, null);
                }
                else {
                    result(null, doc);
                }
            });
    }

    static delete(appointmentID, studentID, result) {
        pool.query("delete from appointment where appointment_id = $1 and student_id = $2", 
        [appointmentID, studentID], (err, doc) => {
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc);
            }
        });
    }
}

module.exports = Appointment;
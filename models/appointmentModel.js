const pool = require('../config/dbConnection');

class Appointment {
    constructor(appointment) {
        this.appointmentID = owner.appointmentID;
        this.schedule = owner.schedule;
        this.origin = owner.origin;
        this.destination = owner.destination;
        this.studentID = owner.studentID;
        this.driverID = owner.driverID;
    }

    static save(appointment, result){
        pool.query("insert into appointment set ?", appointment, (err, doc) => {
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc);
            }
        });
    }

    static findByID(appointmentID, result){
        pool.query("select * from appointment where appointment_id = ? limit 1", appointmentID, (err, doc)=>{
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc[0]);
            }
        });
    }

    static updateAppointmentDriver(driverID, appointmentID, result){
        pool.query("update appointment set driver_id = ? where driverID = ?", 
        [owner.firstName, owner.lastName, owner.emailAddress, owner.phoneNumber, owner.ownerID], (err, doc)=>{
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc);
            }
        });
    }

    static updateAppointment(appointment, result){
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
    
    static delete(appointmentID, result){
        //check to make sure that LIMIT 1 would work as a part of this query
        pool.query("delete from appointment where appointment_id = ? limit 1", appointmentID, (err, doc) => {
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
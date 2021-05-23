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

    save(appointment, result){
        pool.query("insert into appointment values ?", appointment, (err, doc) => {
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

    static updateAppointmentSchedule(schedule, appointmentID, result){
        pool.query("update appointment set sppointment_schedule = ? where appointment_id = ?", 
        [schedule, appointmentID], (err, doc)=>{
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc);
            }
        });
    }

    static updateAppointmentOrigin(origin, appointmentID, result){
        pool.query("update appointment set origin = ? where appointment_id = ?", 
        [origin, appointmentID], (err, doc)=>{
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc);
            }
        });
    }

    static updateAppointmentDestination(destination, appointmentID, result){
        pool.query("update appointment set destination = ? where appointment_id = ?", 
        [destination, appointmentID], (err, doc)=>{
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc);
            }
        });
    }

    static updateAppointmentDriver(driverID, appointmentID, result){
        pool.query("update appointment set driver_id = ? where appointment_id = ?", 
        [driverID, appointmentID], (err, doc)=>{
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc);
            }
        });
    }

    // static updateAppointment(appointment, result){
    //     pool.query("update appointment set schedule = ?, origin = ?, destination = ?, where appointment_id = ?", 
    //     [appointment.firstName, appointment.lastName, appointment.emailAddress, appointment.phoneNumber, appointment.ownerID], (err, doc)=>{

    //         this.appointmentID = appointment.appointmentID;
    //     this.schedule = appointment.schedule;
    //     this.origin = appointment.origin;
    //     this.destination = appointment.destination;
    //     this.studentID = appointment.studentID;
    //     this.driverID = appointment.driverID;
    //         if (err) {
    //             result(err, null);
    //         }
    //         else {
    //             result(null, doc);
    //         }
    //     });
    // }
    
    static delete(appointmentID, result){
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
const pool = require('../config/dbConnection');

class Student {
    constructor(student) {
        this.studentID = student.studentID;
        this.firstName = student.firstName;
        this.lastName = student.lastName;
        this.phoneNumber = student.phoneNumber;
        this.emailAddress = student.emailAddress;
        this.accessCode = student.accessCode;     
    }

    static save(student, result){
        pool.query("insert into student (student_id, first_name, last_name, phone_number, email_address, access_code) values ($1, $2, $3, $4, $5, $6)", 
        [student.studentID, student.firstName, student.lastName, student.phoneNumber, student.emailAddress, student.accessCode], 
        (err, doc) => {
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc);
            }
        });
    }

    static findByID(studentID, result){
        pool.query("select * from student where student_id = $1", [studentID], (err, doc)=>{
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc.rows[0]);
            }
        });
    }

    static updatePhoneNumber(studentID, phoneNumber, result){
        pool.query("update student set phone_number = $1 where student_id = $2", [phoneNumber, studentID], (err, doc)=>{
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc);
            }
        });
    }

    static updateEmailAddress(studentID, emailAddress, result){
        pool.query("update student set email_address = $1 where student_id = $2", [emailAddress, studentID], (err, doc)=>{
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc);
            }
        });
    }

    static updatePassword(studentID, password, result){
        pool.query("update student set access_code = $1 where student_id = $2", [password, studentID], (err, doc)=>{
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc);
            }
        });
    }

    static updateStudent(student, result){
        pool.query("update student set first_name = $1, last_name = $2, email_address = $3, phone_number = $4, access_code = $5 where student_id = $6", 
        [student.firstName, student.lastName, student.emailAddress, student.phoneNumber, student.accessCode, student.studentID], (err, doc)=>{
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc);
            }
        });
    }

    static delete(studentID, result){
        pool.query("delete from student where student_id = $1", [studentID], (err, doc) => {
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc);
            }
        });
    }
}

module.exports = Student;
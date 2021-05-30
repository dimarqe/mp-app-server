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
        pool.query("insert into student (student_id, first_name, last_name, phone_number, email_address, access_code) values (?,?,?,?,?,?)", 
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
        pool.query("select * from student where student_id = ? limit 1", studentID, (err, doc)=>{
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc[0]);
            }
        });
    }

    static updatePhoneNumber(studentID, phoneNumber, result){
        pool.query("update student set phone_number = ? where student_id = ?", [phoneNumber, studentID], (err, doc)=>{
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc);
            }
        });
    }

    static updateEmailAddress(studentID, emailAddress, result){
        pool.query("update student set email_address = ? where student_id = ?", [emailAddress, studentID], (err, doc)=>{
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc);
            }
        });
    }

    static updatePassword(studentID, password, result){
        pool.query("update student set access_code = ? where student_id = ?", [password, studentID], (err, doc)=>{
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc);
            }
        });
    }

    static updateStudent(student, result){
        pool.query("update student set first_name = ?, last_name = ?, email_address = ?, phone_number = ? where student_id = ?", 
        [student.firstName, student.lastName, student.emailAddress, student.phoneNumber, student.studentID], (err, doc)=>{
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc);
            }
        });
    }

    static delete(studentID, result){
        pool.query("delete from student where student_id = ? limit 1", studentID, (err, doc) => {
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
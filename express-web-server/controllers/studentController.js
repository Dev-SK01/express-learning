const fs = require('fs').promises;
const path = require('path');
const data = require('../model/students.json');

const getAllStudents = (req, res) => {
    res.json(data);
}
const createNewStudents = async (req, res) => {
    if (req.body.name || req.body.reg_num) {
        res.status(400).json({ "message": "Name and Register Number required" })
    } else {
        let WholeData = [...data, req.body];
        await fs.writeFile(path.join(__dirname, '..', '..', 'model', 'students.json'), JSON.stringify(WholeData), (err) => { if (err) { console.log(err) } })
        res.json(req.body);
    }
}

const updateStudents = (req, res) => {
    res.json({ "Message": "Updated" })
}
const deleteStudents = (req, res) => {
    res.json({ "id": "Deleted" })
}
const getStudentsById = (req, res) => {
    let student = data.filter((data) => {
        if (req.params.id == data.id) {
            return data
        }
    });
    if (student.length) {
        res.json(student);
    } else {
        res.json({ "Error": "No Data Found" })
    }

}

const deleteStudentById = (req, res) => {
    res.json({ "id": req.params.id })
}

module.exports = {
    getAllStudents,
    createNewStudents,
    updateStudents,
    deleteStudents,
    getStudentsById,
    deleteStudentById
}


const express = require('express')
const router = express.Router();
const studentController = require('./controllers/studentController');

// fucntions are imported from the controllers/stidentController.js
router.route('/')
    //  MVC models
    .get(studentController.getAllStudents)
    .post(studentController.createNewStudents)
    .put(studentController.updateStudents)
    .delete(studentController.deleteStudentById)

// route with id

router.route('/:id')
    .get(studentController.getStudentsById)
    .delete(studentController.deleteStudentById)


module.exports = router;


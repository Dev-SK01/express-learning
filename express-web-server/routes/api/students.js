const path = require('path');
const express = require('express')
const router = express.Router();
const fs = require('fs').promises;

const data = require('../../data/students.json');
// actual we design the api  connect to the database

router.route('/')
    //  these are the chaining of the routes for api url
    .get((req, res) => {
        res.json(data);
    })
    .post(async (req, res) => {
        let WholeData = [...data , req.body]
        await fs.writeFile(path.join(__dirname , '..' ,'..', 'data' , 'students.json'), JSON.stringify(WholeData),(err)=>{
            if(err){
                console.log(err)
            }
        })
        res.json(req.body)
    })
    .put((req, res) => {
        res.json({
           "Message" : "Updated"
        })
    })
    .delete((req, res) => {
        res.json({
            "id" : "Deleted"
        })
    })

// route with id

router.route('/:id')
    .get((req, res) => {
        let student = data.filter((data)=>{
            if(req.params.id == data.id){
                return data
            }
        });
        if(student.length){
            res.json(student);
        }else{
            res.json({"Error" : "No Data Found"})
        }
        
    })
    .delete((req,res)=>{
        res.json({
            "id" : req.params.id
        })
    })


module.exports = router;


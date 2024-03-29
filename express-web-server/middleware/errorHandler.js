const {logEvents } = require('./logEvents');

const errorHandler = (err , req , res , next) =>{
       logEvents(`${err.name}\t${err.message}` , 'ErrorLog.txt');
       res.status(500).send(err.message);
       next();
}

module.exports = errorHandler;
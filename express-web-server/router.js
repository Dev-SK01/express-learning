const express = require('express');
const app = express();
const path  = require('path')
const PORT = process.env.PORT || 2500;
const errorhandler = require('./middleware/errorHandler');
const {requestLogger} = require('./middleware/logEvents');

app.use(requestLogger);
app.use(express.static(path.join(__dirname,'./public')));
app.use('/subdir',express.static(path.join(__dirname,'./public')));
app.use('/subdir', require('./routes/subdir'))
// route for root directory
app.use('/' , require('./routes/root'))
// using the router for subdir

app.use(errorhandler)
app.listen(PORT , (err)=>{
    if(err){
        console.error(err);
    }else{
        console.log(`Server Is Running On ${PORT} \t PID ${process.pid}\n Open: http://127.0.0.1:${PORT}`);
    }
})

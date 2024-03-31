const express = require('express');
const app = express();
const path  = require('path')
const PORT = process.env.PORT || 2500;
const errorhandler = require('./middleware/errorHandler');
const {requestLogger} = require('./middleware/logEvents');

// app.use(requestLogger);
app.use(express.json());
app.use('/',express.static(path.join(__dirname,'./public')));
app.use('/subdir',express.static(path.join(__dirname,'./public')));
// api endpoint | route
app.use('/students' , require('./routes/api/students'));
app.use('/mvc' , require('./mvc'));
app.use('/subdir', require('./routes/subdir'));
app.use('/' , require('./routes/root'));

// app.use(errorhandler)
app.listen(PORT , (err)=>{
    if(err){
        console.error(err);
    }else{
        console.log(`Server Is Running On ${PORT} \t PID ${process.pid}\n Open: http://127.0.0.1:${PORT}`);
    }
})

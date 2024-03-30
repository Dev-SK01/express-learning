const express = require('express');
const app = express();
const path = require('path');   
const PORT = process.env.PORT || 2500;

app.use('/' , require('./routes/root'));

app.listen(PORT , (err)=>{
    if(err){
        console.error(err);
    }else{
        console.log(`Server Is Running On ${PORT} \t PID ${process.pid}\n Open: http://127.0.0.1:${PORT}`);
    }
})

const express = require('express');
const app = express();
const path = require('path');  
const {requestLogger} = require('./middleware/logEvents');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler')
const PORT = process.env.PORT || 2500;


// ----------------------- Custom MIddleWare ------------------
app.use(requestLogger); // loggig middle ware for user requests

// ----------------------- Third Party MIddleWare ------------------
app.use(cors());
// ----------------------- Built-In middle Ware------------------
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static(path.join(__dirname , './public')))

// regex
app.get('^/$|index(.html)?' , (req ,res)=>{ // regex used to handle the / and index
    res.sendFile(path.join(__dirname , 'views' , 'index.html'));
});
// sendFile
app.get('/new(-)?page(.html)?' , (req ,res)=>{
    res.sendFile(path.join(__dirname ,'views','new-page.html'))
});
// redirect
app.get('/old(-)?page(.html)?' , (req ,res)=>{
    res.redirect( 301, 'new-page.html')
});
// 404 error handle
app.get('/*' , (req ,res)=>{
    res.status(404).sendFile(path.join(__dirname ,'views','404.html'))
});

app.use(errorHandler) // middleware handles the error id=f occur in the server

app.listen(PORT , (err)=>{
    if(err){
        console.error(err);
    }else{
        console.log(`Server Is Running On ${PORT} \t PID ${process.pid}\n Open: http://127.0.0.1:${PORT}`);
    }
})

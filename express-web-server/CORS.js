const express = require('express');
const app = express();
const path = require('path');   
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 2500;

// handling the Cross Origin Resource sharing
const whileList = ['https://Yoursite.com' , 'http://localhost:2500']

const corsObject = {
    origin :(origin , callback) =>{
        if(whileList.indexOf(origin) !== -1 || !origin){
            callback(null, true);
        }else{
            callback(new Error('Not Allowed By CORS !'))
        }
    } , 
    optionsSuccessStatus : 200
}
app.use(cors(corsObject));
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
app.get('/*' , (req ,res ,next)=>{
    console.log('Next Executed..')
    next()
} , (req ,res)=>{
    res.status(404).sendFile(path.join(__dirname ,'views','404.html'))
});
app.use(errorHandler);
app.listen(PORT , (err)=>{
    if(err){
        console.error(err);
    }else{
        console.log(`Server Is Running On ${PORT} \t PID ${process.pid}\n Open: http://127.0.0.1:${PORT}`);
    }
})

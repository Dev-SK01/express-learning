const path = require('path');
const express = require('express')
const router = express.Router();        

// regex
router.get('^/$|index(.html)?' , (req ,res)=>{ // regex used to handle the / and index
    res.sendFile(path.join(__dirname , '..','views' , 'index.html'));
});
// sendFile
router.get('/new(-)?page(.html)?' , (req ,res)=>{
    res.sendFile(path.join(__dirname ,'..','views','new-page.html'))
});
// redirect
router.get('/old(-)?page(.html)?' , (req ,res)=>{
    res.redirect( 301, 'new-page.html')
});
// 404 error handle
router.get('/*' , (req ,res ,next)=>{
    res.status(404).sendFile(path.join(__dirname ,'..' ,'views','404.html'))
});

module.exports = router
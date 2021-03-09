const express = require ('express')
const mongoose = require('mongoose')
const mongodb = require('mongodb')
const multer = require('multer')
const ejs = require('ejs')
const path = require('path')
const { log } = require('console')

//set Storage Engine
const storage = multer.diskStorage({
    destination: './uploads',
    filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
    }
})

//Init Uploads
const uploads = multer({
    storage: storage,
    limits:{fileSize:1000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }   
}).single("myImage");

    //check file type
function checkFileType(file,cb){
        // Allowed extension 
        const filetypes = /jpeg|jpg|png|gif/;

        //check the extension
        const extname =  filetypes.test( path.extname(file.originalname).toLowerCase());
        //Check mime 
        const mimetype = filetypes.test(file.mimetype)
        if(mimetype && extname){
            return cb(null,true);
        }
        else{
            cb('Error: Images Only! ')
        }
}

//INIT app 
const app = express()
const port = 3000;


//EJS
app.set('view engine', 'ejs')

//public folder
app.use(express.static('./upload'))


app.get('/',(req,res) => res.render('index'))

app.post('/uploads',uploads,async(req,res)=>{
    try {  
        res.json({message: "Upload success"});
    } catch (error) {
        res.json({message: error.message});
    }
 })

// app.post('/upload',async(req,res) =>{
//     uploads(req,res,(err) =>{
//         if(err){
//             res.render('index',{
//                 msg: err
//             })
//         }else{
//             console.log(req.file);
//             res.send('test')
//         }
//     })
// })

app.listen(port,()=>
    console.log('Server started on port 3000')
)
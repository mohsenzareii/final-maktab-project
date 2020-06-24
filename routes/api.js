const express = require ('express');
const router = express.Router();
const User = require ('../models/user');






router.get('/signup' , (req , res) =>{
    res.render('pages/signup',{message: ""});
});


router.post('/signup' , async(req , res) =>{
    try {
        if (!req.body.firstName || !req.body.lastName || !req.body.userName || !req.body.mobile || !req.body.password  ) {
            throw new Error('Empty fields !');
        }
     
        let user = await User.findOne({userName : req.body.userName});
        if (user) {
             throw new Error('userName already exists !');
        }
        
        if(req.body.password.length <3 || req.body.password.length > 30){
            throw new Error('please enter password with greater than 3 or less than 30 charachters!');
        }

        const New_User = new User ({
             firstName : req.body.firstName ,
             lastName : req.body.lastName ,
             userName : req.body.userName ,
             mobile : req.body.mobile ,
             password : req.body.password ,
             sex : req.body.sex ,
             role : "blogger" 
        });
     
        await New_User.save();

        res.render('pages/login');
        
    } catch (error) {
       res.render('pages/signup',{message : error.message});
    }

   
});

router.get('/login', (req , res) =>{
    res.render('pages/login' , {message : ""});
});

router.post('/login' , async (req,res) =>{
    try {
        if(!req.body.userName || !req.body.password){
            throw new Error('please Enter userName and password !');
        }
        let blogger= await User.findOne({userName : req.body.userName ,
                                         password : req.body.password});
        if (!blogger){
            throw new Error('userName or password is incorrect');
        }                                 

      

        res.redirect('/dashbord');
    } catch (error) {
        res.render('pages/login' ,{message : error.message});
    }
});

module.exports = router ;



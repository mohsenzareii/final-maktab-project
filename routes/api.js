const express = require ('express');
const router = express.Router();
const User = require ('../models/user');


router.get('/' , (req , res) =>{
    res.send("hello");
    //res.render('pages/signup');
});
router.post('/signup' , async(req , res) =>{
    try {
        if (req.body.firstName || req.body.lastName || req.body.userName || req.body.mobile || req.body.password  ) {
            return res.render('pages/signup' , {error : "Empty fields !"});
        }
     
        let user = await User.findOne({userName : req.body.userName});
        if (user) {
             return res.render('pages/signup' , {error : "user already exists !"});
        }
     
        checkLengthInput(req.body.firstName);
        checkLengthInput(req.body.lastName);
        checkLengthInput(req.body.userName);
         
     
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
        console.log('something went wrong !' + error);
    }

   
});


module.exports = router ;


function checkLengthInput (input) {
    if (input.length < 3) {
        return res.render('pages/signup' , {error : input + "less than 3 characters"});
    }else if (input.length > 30) {
        return res.render('pages/signup' , {error : input + "greater than 30 characters"});
    }
};
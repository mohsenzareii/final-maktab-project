const express = require('express');
const router = express.Router();
const User = require ('../models/user');
const multer = require('multer');
const fs = require('fs');

//disk storage multer -> storage images address and name
const storage = multer.diskStorage({
    destination : function (req, file, cb){
        cb(null,'public/avatar');
    },
    filename : function(req,file,cb){
        cb(null, req.session.user.userName + "-"+ file.originalname);
    }
});

const uploadAvatar = multer({storage : storage});

//send dashboard page to client
router.get('/dashboard', (req, res) => {
    res.render('pages/dashboard', {user : req.session.user});   
});

//send edit profile page to client
router.get('/editProfile', (req, res) =>{
    res.render('pages/editProfile', {user : req.session.user, message : ''});
});

//check and update user's information in database
router.put('/edit', async(req,res) =>{
    try {
         if(!req.body.firstName || !req.body.lastName || !req.body.userName){
            throw new  Error('لطفا تمام موارد را کامل وارد کنید ');
         }
         console.log(req.body.avatar);
        //  npm

         await User.findByIdAndUpdate({_id : req.session.user._id}, {$set :{firstName : req.body.firstName,
                                                                            lastName : req.body.lastName,
                                                                            userName : req.body.userName}},{new : true});
         let blogger = await User.findById({_id : req.session.user._id});
         req.session.user = blogger;
         
        res.send({redirect : '/api/user/dashboard'});
    } catch (error) {
        res.render('pages/editProfile', {user : req.session.user, message : error.message});
    }
   
});

//log out : delete session and send home page to client
router.get('/logOut', (req, res) =>{
    if(req.session){
        req.session.destroy((err) =>{
            if(!err) return res.redirect('/api/');
        });
    }
});

module.exports = router;
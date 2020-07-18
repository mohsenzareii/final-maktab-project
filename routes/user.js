const express = require('express');
const router = express.Router();
const User = require ('../models/user');
const { findById } = require('../models/user');

//send dashboard page to client
router.get('/dashboard', (req, res) => {
    res.render('pages/dashboard', {user : req.session.user});   
});

//send edit profile page to client
router.post('/editProfile', (req, res) =>{
    res.render('pages/editProfile', {user : req.session.user, message : ''});
});

//check and update user's information in database
router.put('/edit', async(req,res) =>{
    try {
        if(!req.body.firstName || !req.body.lastName || !req.body.userName){
            throw new  Error('لطفا تمام موارد را کامل وارد کنید ');
         }
        
         await User.findOneAndUpdate({_id : req.session.user._id}, {$set :{firstName : req.body.firstName,
                                                                            lastName : req.body.lastName,
                                                                            userName : req.body.userName}},{new : true});
         let blogger = await findById({_id : req.session.user._id});
         req.session.user = blogger;
         
         res.redirect('/api/user/dashboard');
    } catch (error) {
        res.render('pages/editProfile', {user : req.session.user, message : error.message});
    }
   
});

//log out : delete session and send home page to client
router.post('/logOut', (req, res) =>{
    if(req.session){
        req.session.destroy((err) =>{
            if(!err) return res.redirect('/api/');
        });
    }
});

module.exports = router;
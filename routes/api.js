const express = require ('express');
const router = express.Router();
const User = require ('../models/user');
const userRouter = require('./user');
const articleRouter = require('./articles');

const checkSession = function(req, res, next) { 
    if (!req.session.user) return res.redirect('/api/login')
    next();
};


const isLogin = function (req, res, next) {
    if (req.session.user) return res.redirect('/api/user/dashboard');
    
    next();
}

//route to user.js
router.use('/user', checkSession, userRouter);

//route to articles.js
router.use('/articles', checkSession, articleRouter);
// router.get('/myArticles', (req,res) =>{
//     res.render('pages/myArticles');
// });

//send home page to client
router.get('/', (req, res) =>{
    res.render('pages/home');
});

//send signup page to client
router.get('/signup' , (req , res) =>{
    res.render('pages/signup',{message: ""});
});



//check and storage user information to database
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
     
       // await New_User.save();
        let savePromise = new Promise (function (resolve , reject){
            New_User.save ((err, user) => {
                if (err) reject(res.render('pages/signup',{message : error.message}));
                resolve ( res.render('pages/login',{message : ""})); 
            })
        });

        savePromise.then(function(result) {
            console.log("ok");
            
        }).catch (function(error){
            console.log("not ok");
            
        })
        //res.render('pages/login');
        
    } catch (error) {
       res.render('pages/signup',{message : error.message});
    }

   
});

//send login page to client
router.get('/login', isLogin, (req , res) =>{
    res.render('pages/login' , {message : ""});
});

//check username and password in database and route to dashboard page
router.post('/login',  async (req,res) =>{
    try {
        if(!req.body.userName || !req.body.password){
            throw new Error('please Enter userName and password !');
        }
        let blogger= await User.findOne({userName : req.body.userName ,
                                         password : req.body.password});
        if (!blogger){
            throw new Error('userName or password is incorrect');
        }                                 
        
        req.session.user = blogger;
        
        res.redirect('/api/user/dashboard');
       
    } catch (error) {
        res.render('pages/login' ,{message : error.message});
    }
});

module.exports = router ;



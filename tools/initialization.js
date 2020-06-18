const User = require ('../models/user');

//check existing admin and create admin account
const initialization = async() => {
   
    try {
        const Exist_Admin = await User.findOne ({role : 'admin'});
        if (Exist_Admin){
            return console.log('Admin already exists !');
        }
    
        const ADMIN = new User ({
            firstName : "mohsen" ,
            lastName : "zarei" ,
            userName : "mohsen" ,
            mobile : "09196381290" ,
            sex : "male" ,
            role : "admin" ,
            password : "12345678"
        });
     
        await ADMIN.save();
        console.log("Admin created");
    
    } catch (error) {
        console.log('Error in intialization function', error);
    }

}

module.exports = initialization;
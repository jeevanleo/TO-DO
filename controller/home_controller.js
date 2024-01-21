const Lists = require("../models/lists");
const User = require('../models/user')
//export indicates that this function is visible to all thefiles inthe project
module.exports.create = async function(req,res){
    try{
        //it will collect the database collection
        const lists = await Lists.find({});
        //after collecting the database it will render into home.ejs
        return res.render('home',{
            title:"Daily Routene Lists",
            contactList : lists
        })
    }catch(err){ 
        console.log("error");
    }
}
module.exports.welcome = function(req,res){
    return res.render('welcome');
}
//this function will controll the routes and the the delete operations
module.exports.delete=async function(req,res){
    try{
        let id =  req.query.id;
        //this will delete list bassed on the id
        const contact = await Lists.findByIdAndDelete(id);
        return res.redirect('back');
    }catch(err){
        console.log('error');
    }
}
module.exports.sign_in= function(req,res){
    
    return res.render('sign-in');
}
module.exports.sign_up= function(req,res){
    
    return res.render('sign-up');
}

module.exports.createSession = async function(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            if(user.password == req.body.password){
            return res.redirect('/create');
            }
        }
    } catch (err) {
        console.log('Error searching for user:', err);
    }
    return res.redirect('/sign-in');
}

module.exports.createsign_up= async function(req,res){
    try{
        const user = await User.findOne({email:req.body.email});
        if(!user){
            User.create({
                email:req.body.email,
                password:req.body.password,
                name:req.body.name
            });
                return res.redirect('/sign-in');
        }else{
            return res.redirect('/sign-up');
        }       

    }catch(err){
        console.log('error in database');
    }
    
    
}
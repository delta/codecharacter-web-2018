"use strict";

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt-nodejs");
<<<<<<< HEAD
const models = require("../models");
=======
const saltRounds = 10;
const dbInit = require('../middlewares/dbInit');
const sequelize = dbInit.sequelize;
const models = require('../models');
console.log(models.Code);
>>>>>>> 5f315c6... Add authorization
/* GET home page. */
// User login+signup handlers

// GET handlers
router.get("/login", (req, res) => {
<<<<<<< HEAD
	if (req.session.isLoggedIn) {
		return res.redirect("/");
	}
	//res.redirect("/login.html");
	//for now
	res.json({ success: "true", message: "login page" });
=======
    if (req.session.isLoggedIn) {
        return res.redirect("/");
    }
    //res.redirect("/login.html");
    //for now
    res.json({ success: "true", message: "login page" });
>>>>>>> 5f315c6... Add authorization
});

// signup
router.post("/signup", (req, res) => {
<<<<<<< HEAD
	const emailId = req.body.emailId;
	const name = req.body.name;
	const password = req.body.password;
	// validate e-mail
	if (!emailId || !name || !password) {
		return res.json({ "status": 200, "success": false, "message": "Please fill all the required details" });
	}

	//check if user exists
	models.User.findOne({
		where: { email: emailId }
	})
		.then((user) => {
			if (user) {
				return res.json({ success: false, message: "This e-mail already exists!" });
			}
		});
	//create user
	const hashedPassword = bcrypt.hashSync(password);
	models.User.create({ email: emailId, name: name, password: hashedPassword })//pragyanId has to be added later
		.then((user) => {
			if (user) {
				return res.json({ success: true, message: "User signedup!" });
			}
		});
});
router.get("/signup", (req, res) => {
	if (req.session.isLoggedIn) {
		return res.redirect("/");
	}
	//res.redirect("/signup.html");
	//for now
	res.json({ success: "true", message: "signup page" });
});
router.post("/login", (req, res) => {
	const emailId = req.body.emailId;
	const password = req.body.password;
	if(!emailId || !password){
		return res.json({success:false, message:"Pass proper params"});
	}
	//check if user exists
	models.User.findOne({
		where: { email: emailId }
	})
		.then((user) => {
			if (!user) {
				return res.json({ success: false, message: "User doesn't exist!" });
			}
			if(bcrypt.compareSync(password, user.dataValues.password)){
				req.session.isLoggedIn = true;
				req.session.userId = user.id;
				return res.json({success:true, message:"Logged in!"});
			}else{
				return res.json({success:false, message:"Wrong Password!"});
			}
		});
});
router.get("/logout", (req, res)=>{
	if(req.session.isLoggedIn){
		req.session.isLoggedIn = false;
	}
	res.redirect("/login");
});
=======
    const emailId = req.body.emailId;
    const name = req.body.name;
    const password = req.body.password;
    // validate e-mail
    if (!emailId || !name || !password) {
        return res.json({ "status": 200, "success": false, "message": "Please fill all the required details" });
    }

    //check if user exists
    models.User.findOne({
        where: { email: emailId }
    })
        .then((user) => {
            if (user) {
                console.log(user)
                return res.json({ success: false, message: "This e-mail already exists!" });
            }
        })
    //create user
    const hashedPassword = bcrypt.hashSync(password);
    models.User.create({ email: emailId, name: name, password: hashedPassword })//pragyanId has to be added later
        .then((user) => {
            if (user) {
                return res.json({ success: true, message: "User signedup!" });
            }
        })
});
router.get("/signup", (req, res) => {
    if (req.session.isLoggedIn) {
        return res.redirect("/");
    }
    //res.redirect("/signup.html");
    //for now
    res.json({ success: "true", message: "signup page" });
});
router.post('/login', (req, res) => {
    const emailId = req.body.emailId;
    const password = req.body.password;
    if(!emailId || !password){
        return res.json({success:false, message:"Pass proper params"});
    }
    //check if user exists
    models.User.findOne({
        where: { email: emailId }
    })
        .then((user) => {
            console.log(user);
            if (!user) {
                console.log(user)
                return res.json({ success: false, message: "User doesn't exist!" });
            }
            if(bcrypt.compareSync(password, user.dataValues.password)){
                console.log(1);
                req.session.isLoggedIn = true;
                return res.json({success:true, message:"Logged in!"});
            }else{
                console.log(2);
                return res.json({success:false, message:"Invalid params!"});
            }
        })
})
router.get('/logout', (req, res)=>{
    if(req.session.isLoggedIn){
        req.session.isLoggedIn = false;
    }
    res.redirect('/login');
})
>>>>>>> 5f315c6... Add authorization
module.exports = router;

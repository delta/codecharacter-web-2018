"use strict";

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt-nodejs");
const models = require("../models");
const request = require("request");
/* GET home page. */
// User login+signup handlers

// GET handlers
router.get("/login", (req, res) => {
  if (req.session.isLoggedIn) {
		//return res.redirect("/");
		return res.json({success: true});
	}else{
		return res.json({success: false});
	}
	//res.redirect("/login.html");
	//for now
	//res.json({ success: "true", message: "login page" });
});

// signup
router.post("/signup", (req, res) => {
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
	models.User.create({ email: emailId, name: name, password: hashedPassword, rating: 0 })//pragyanId has to be added later
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
	let usePragyan = req.body.usePragyan;
	if(usePragyan){
		console.log('using pragyan');
		let options = {
			user_email: emailId,
			user_pass: password,
			event_id: 2,
			event_secret: "b6557e6b07dbae3265f83f088a7fad4a7a8203b4"
		};
		request({
			method:'POST',
			url: 'https://api.pragyan.org/event/login',
			json: true,
			body: options
		}, (err, response) => {
			console.log(response.body);
			if(err) console.log(err);
			switch(response.body.status_code){
				case 400: {
					return res.json({success: false, message: 'Server Error'}); // Invalid Parameters unexposed
				}
				break;
				case 403: {
					return res.json({success: false, message: 'Server Error'}); //forbidden secret mismatch
				}
				break;
				case 412: {
					return res.json({success: false, message: 'Please register on main website'});
				}
				break;
				case 401: {
					return res.json({success: false, message: 'Please enter correct emailid, password combination!'});
				}
				break;
				case 406: {
					return res.json({success: false, message: 'Please register for the event!'});
				}
				break;
				case 200: {
					models.User.findOne({
						 email_id: emailId
					})
						.then(user => {
							if(user){
								req.session.isLoggedIn = true;
								req.session.userId = user.id;
								res.json({success: true, message: 'Log In Successful!'});
							}else{
								//no user with the emailId
								models.User.create({
									email_id: emailId,
									name: response.body.message.user_fullname,
									pragyanId: response.body.message.user_id
								})
									.then(userCreated => {
										req.session.isLoggedIn = true;
										req.session.userId = userCreated.id;
										res.json({success: true, message: 'Log In Successful!'});
									})
							}
						})
						.catch(err => {
							res.json({success: false, message: 'Login failed.'});
						})
				}
				break;
			}
		})
	}else{
		
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
	}
});
router.get("/logout", (req, res)=>{
	if(req.session.isLoggedIn){
		req.session.isLoggedIn = false;
	}
	res.redirect("/login");
});
module.exports = router;

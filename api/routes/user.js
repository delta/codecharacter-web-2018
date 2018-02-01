"use strict";

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt-nodejs");
const models = require("../models");
const request = require("request");
const nodemailer = require("nodemailer");
const stubCode = require('../utils/stubCode');
const API_KEY = require("../config/email.js").API_KEY;
const Op = require('sequelize').Op;
const sgMail = require('@sendgrid/mail');
/* GET home page. */
// User login+signup handlers


let userOfDbCheck = (req, res) => {

	const emailId = req.body.emailId;
	const password = req.body.password;
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
					if(!user.logged_in_once){
						models.User.update({
							logged_in_once: true
						},{
							where: {
								id: user.id
							}
						})
							.then( () => {
								return res.json({success:true, message:"Logged in!", userId: user.id, logged_in_once: user.logged_in_once});			
							})
							.catch( err => {
								console.log(err);
								res.json({success: false, message: "Server failed!"});
							})
					}else{
						return res.json({success:true, message:"Logged in!", userId: user.id, logged_in_once: user.logged_in_once});				
					}
				}else{
					return res.json({success:false, message:"Wrong Password!"});
				}
			});
}
let sendEmail = (emailId, activationToken, name) => {
	sgMail.setApiKey(API_KEY);
	const subject = "Activate your Code Character account";
	const html = `
		<p>Hello ${name},</p>
		<p>Thank you for registering for Code Character!</p>
		<p><strong>Please click the following link to verify your account:</strong><br>
		<a href="https://code.pragyan.org/api/activate/${activationToken}">https://code.pragyan.org/api/activate/${activationToken}</a></p>
		<p>Happy coding :)</p>
	`;
	const msg = {
	  to: emailId,
	  from: 'no-reply@pragyan.org',
	  subject,
	  html
	};
	sgMail.send(msg);
};
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
router.get('/all', (req, res) => {
	models.User.findAll({
		where: {}
	})
		.then(users => {
			users.sort( (user1, user2) => {
				if(user1.dataValues.rating > user2.dataValues.rating){
					return -1;
				}else{
					return 1;
				}
			});
			//console.log(users);
			//users = users.reverse();
			let codeFetchPromises = [];
			let usersWithLockedCode = [];
			users.map(user => {
				let x = models.Match.findOne({
					where: {
						$or: [
							{
								player_id1: user.id,
								player_id2: {
									[Op.not] : user.id
								}
							},
							{
								player_id1: {
									[Op.not] : user.id
								},
								player_id2: user.id
							}
						]
					}
				})
					.then(match => {
						//console.log(match.dataValues);
						if(!match){
							//return;
						}else{
							usersWithLockedCode.push(user);
						}

					})
					.catch(err => {
						console.log(err);
						//throw err;
					});
					//console.log(new Date());
				codeFetchPromises.push(x);
			})
			let ratings = [];
			//console.log(codeFetchPromises);
			Promise.all(codeFetchPromises)
				.then(dataReturned => {
					res.json({success:true, length: usersWithLockedCode.length});
				})
				.catch(err => {
					console.log(err);
					throw err;
				});
		})
		.catch(err => {
			console.log(err);
			res.json({success: false});
		})
});
// signup
router.post("/signup", (req, res) => {
	//console.log(req.body, 'hey');
	const emailId = req.body.emailId;
	const name = req.body.name;
	const password = req.body.password;
	const nationality = req.body.nationality;
	// validate e-mail
	if (!emailId || !name || !password || !nationality) {
		return res.json({ "status": 200, "success": false, "message": "Please fill all the required details" });
	}

	//check if user exists
	models.User.findOne({
		where: {
			$or: [
				{email: emailId },
				{name: name }
			]
		}
	})
		.then((user) => {
			if (user) {
				return res.json({ success: false, message: "The username already exists!" });
			}else{
				const hashedPassword = bcrypt.hashSync(password);
				const date = new Date();
			  const dateInMs = date.getTime();
			  const activationToken = bcrypt.hashSync(emailId + dateInMs);
			  const activationTokenExpiryTime = new Date(dateInMs + 86400000);
				models.User.create({
					email: emailId,
					name: name,
					nationality,
					password: hashedPassword,
					rating: 1000,
					is_active: false,
					activation_key: bcrypt.hashSync(password + Math.random()*3001),
					activation_deadline: activationTokenExpiryTime,
					logged_in_once: false
				})//pragyanId has to be added later
					.then((user) => {
					  console.log(user);
						if (user) {
							models.Code.create({
								user_id: user.id,
								source: stubCode
							})
								.then(code => {
									//console.log(user.dataValues);
									models.Notification.create({
										type: 'SUCCESS' ,
					          title: 'Signed Up!',
					          message:`Please check your email to verify your account. You can login now.`,
					          isRead: false,
					          user_id: user.dataValues.id
									})
										.then(notification => {
											//console.log(notification)
											sendEmail(user.email, user.activation_key, user.name);
										})
										.catch(err => {
											console.log(err);
										})

									return res.json({ success: true, message: "User signedup!"});
								})
						}
					});
			}
		});
	//create user

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
	//let usePragyan = Number(req.body.usePragyan);
	////console.log(usePragyan);
	//console.log('using pragyan');
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
		if(err) console.log(err);
		if( !response || !response.body){
		  res.json({success: false, message: 'Pragyan server error'});
    }
		switch(response.body.status_code){
			case 400: {
				userOfDbCheck(req, res);
				//return res.json({success: false, message: 'Server Error'}); // Invalid Parameters unexposed
			}
			break;
			case 403: {
				return res.json({success: false, message: 'Server Error'}); //forbidden secret mismatch
			}
			break;
			case 412: {
				userOfDbCheck(req, res);
				//return res.json({success: false, message: 'Please register on main website'});
			}
			break;
			case 401: {
				//return res.json({success: false, message: 'Please enter correct emailid, password combination!'}); //POTENTIAL USER OF OUR DB
				userOfDbCheck(req, res);
			}
			break;
			case 406: {
				return res.json({success: false, message: 'Please register for the event!'});
			}
			break;
			case 200: {
				////console.log(emailId);
				models.User.findOne({
					 where:{
					 	email: emailId
					 }
				})
					.then(user => {
						if(user){
							req.session.isLoggedIn = true;
							req.session.userId = user.id;
							//console.log(req.session);
							res.json({success: true, message: 'Log In Successful!', userId: user.id});
						}else{
							//no user with the emailId
							models.User.create({
								email: emailId,
								name: response.body.message.user_fullname,
								pragyanId: response.body.message.user_id,
								rating: 1000,
								is_active: 1,
								logged_in_once: true
							})
								.then(userCreated => {
									models.Code.create({
										user_id: userCreated.id,
										source: stubCode
									})
										.then(code => {
											req.session.isLoggedIn = true;
											req.session.userId = userCreated.id;
											res.json({success: true, message: 'Log In Successful!',  userId: user.id, logged_in_once: false});
										})
								})
						}
					})
					.catch(err => {
						//console.log(err);
						res.json({success: false, message: 'Login failed.'});
					})
			}
			break;
		}
	})

});
router.get('/activate/:activation_key', (req, res) => {
	models.User.findOne({
		where: {
			activation_key: req.params.activation_key
		}
	})
		.then(user => {
			let time = new Date();
			let timeInMs = time.getTime()
			//if(user.activation_deadline > timeInMs){} //for now lets not check the limit
			if(user.is_active){
				return res.json({success: false, message: 'Already activated!'});
			}
			models.User.update({
				is_active: true
			},
			{
				where: {
					id: user.id
				}
			})
				.then(success => {
					if(success){
						res.json({success: true, message: 'User activated!'});
					}else{

					}
				})
				.catch(err => {
					//console.log(err, 1);
					res.json({success: false, message: 'Activation Failed!'});
				})
		})
		.catch(err => {
			//console.log(err, 1);
			res.json({success: false, message: 'Activation Failed!'});
		})
})
router.get("/logout", (req, res)=>{
	if(req.session.isLoggedIn){
		req.session.isLoggedIn = false;
	}
	res.redirect("/login");
});
router.get('/search/:name', (req, res) => {
	let searchName = req.params.searchName;
	models.User.findOne({
		name: searchName
	})
		.then(user => {
			if(user){
				res.json({success: true, user});
			}else{
				res.json({success: false, message: "No user by that name!"});
			}
		})
		.catch(err => {
			res.json({success: true, message: "Server error!"});
		})
})
router.get("/profile/:id", (req, res)=>{
	models.User.findOne({
		where:{id:req.params.id},
		attributes:["id", "name", "email", "rating", "nationality"]
	})
		.then((user)=>{
			if(!user){
				res.json({success:false, message:"No users with this id"});
			}else{
				res.json({success:true, user:user.dataValues});
			}
		});
});
router.get("/name/:name", (req, res)=>{
	models.User.findOne({
		where:{name:req.params.name},
		attributes:["id", "name", "email", "rating"]
	})
		.then((user)=>{
			if(!user){
				res.json({success:false, message:"No users with this name"});
			}else{
				res.json({success:true, user:user.dataValues});
			}
		});
});
module.exports = router;

"use strict";

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt-nodejs");
const models = require("../models");
const request = require("request");
const nodemailer = require("nodemailer");

const senderEmailId = require("../config/email.js").email_id; // use const here
const senderPassword = require("../config/email.js").password;
/* GET home page. */
// User login+signup handlers

const smtpTransport = nodemailer.createTransport({
  "service": "Gmail",
  "auth": {
    "user": senderEmailId,
    "pass": senderPassword,
  },
});

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
					return res.json({success:true, message:"Logged in!", userId: user.id});
				}else{
					return res.json({success:false, message:"Wrong Password!"});
				}
			});
}
let sendEmail = (email, message, res, activationToken, subject) => {
  const mailOptions = {
    "to": email,
    "subject": subject,
    "text": message,
  };

  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      //console.log(error);
      // send message from callee
      return res.json({ "status": 200, "success": true, "message": message });
    }

    res.json({ "status": 200, "success": true, "message": "Thank you for registering. Please check your e-mail inbox to complete registration!" });
    //console.log(`Message sent: ${response.message}`);
  });
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
	const date = new Date();
  const dateInMs = date.getTime();
  const activationToken = bcrypt.hashSync(emailId + dateInMs);
  const activationTokenExpiryTime = new Date(dateInMs + 86400000);
	models.User.create({
		email: emailId,
		name: name,
		password: hashedPassword,
		rating: 1000,
		is_active: false,
		activation_key: bcrypt.hashSync(password + Math.random()*3001),
		activation_deadline: activationTokenExpiryTime
	})//pragyanId has to be added later
		.then((user) => {
			if (user) {
				return res.json({ success: true, message: "User signedup!", activation_key: user.activation_key });
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
		if(err) //console.log(err);
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
				return res.json({success: false, message: 'Please register on main website'});
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
								is_active: 1
							})
								.then(userCreated => {
									req.session.isLoggedIn = true;
									req.session.userId = userCreated.id;
									res.json({success: true, message: 'Log In Successful!',  userId: user.id});
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
router.post('/activate', (req, res) => {
	models.User.findOne({
		where: {
			activation_key: req.body.activation_key
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
module.exports = router;

"use strict";
const express = require("express");
const router = express.Router();
const models = require("../models");
const request = require("request");
const queueCompile = require('../utils/queueCompile');
/* GET home page. */
router.post("/", function(req, res) {
	const source = req.body.source;
	const userId = Number(req.session.userId);
	if(!source){
		return res.json({success:false, message:"Pass proper params!"});
	}
	//update if already
	models.Code.findOne({
		where:{
			user_id: req.session.userId,
		}
	})
		.then((code)=>{
			//here compile code and save as dlls in code
			//just push the code and userID to the queue
			if(!code){
				//create
				models.Code.create({
					source,
					user_id: userId,
					status: 'compiling'
				})
					.then(code => {
						let success = queueCompile.pushToQueue(req.session.userId, source);
						console.log(success);
						if(!success){
							return res.json({success: false, message: "Please try again later!"});
						}
						return res.json({success:true, message:"Code saved!", userId});
					})
					.catch(err => {
						console.log(err);
						res.json({success: false, message: 'Please try later!'});
					})
			}else{
				//update
				models.Code.update({
					source,
					status: 'compiling'
				},{
					where: {
						user_id: userId
					}
				})
					.then(code => {
						let success = queueCompile.pushToQueue(req.session.userId, source);
						console.log(success);
						if(!success){
							return res.json({success: false, message: "Please try again later!"});
						}
						return res.json({success:true, message:"Code saved!", userId});
						//res.json({success: true, message:'Code compiling!', user_id: userId});
					})
					.catch(err => {
						res.json({success: false, message: 'Please try later!'});
					})
			}
		})
		.catch(err => {
			console.log(err);
			res.json({success: false, err: err});
		});
});
/*
let success = queueCompile.pushToQueue(req.session.userId, source);
			console.log(success);
			if(!success){
				return res.json({success: false, message: "Please try again later!"});
			}
			if(!code){
				return res.json({success:true, message:"Updated!"});
			}
			return res.json({success:true, message:"Code saved!"});
*/
router.get('/error_status', (req, res) => {
	//params
	models.Code.find({
		where: {
			user_id: req.session.userId
		}
	})
		.then(code => {
			if(code.status === "ERROR"){
				res.json({success: true, error: code.error_log});
			}else{
				res.json({success: false, message:'There are no error in your saved code!'});
			}
		})
})
router.get("/lock", (req, res) => {
	models.User.findOne({
		where: {
			id: Number(req.session.userId)
		}
	})
		.then(user => {
				if(!user.is_active){
					return res.json({success: false, message:'Please check your e-mail for activation link!'})
				}else{
					models.Code.findOne({
						where: {
							user_id: req.session.userId
						}
					})
						.then(code => {
							let dll1 = code.dll1;
							let dll2 = code.dll2;
							models.Code.update({
								dll1_locked: dll1,
								dll2_locked: dll2
							},
							{
								where: {
									user_id: req.session.userId
								}
							})
								.then(() => {
									res.json({success: true, message: 'Code locked!'})
								})
								.catch(err => {
									res.json({success: false, message: 'Code locked failed!'});
								})
						})
				}
		})

})
router.get("/", (req, res)=>{
  console.log(req.session.userId);
	models.Code.findOne({
		where: {user_id: req.session.userId}
	})
		.then((code)=>{
			if(!code){
				return res.json({success:false, message:"Oops, this user has no code saved!"});
			}
			console.log(code.dataValues.status);
			if(code.dataValues.status === 'COMPILING'){
				return res.json({success:true, source:code.dataValues.source, status:'COMPILING'});
			}else if(code.dataValues.status === 'SUCCESS'){
				//add these , dll1: code.dataValues.dll1, dll2: code.dataValues.dll2
				//console.log({dll1: code.dataValues.dll1, dll2: code.dataValues.dll2});
				return res.json({success:true, source:code.dataValues.source, status: 'SUCCESS'});
			}else{
				return res.json({success:true, source:code.dataValues.source, status: 'ERROR'});
			}
		})
		.catch(err => {
			res.json({success: false, message: 'Internal server error'});
		})
});
router.post("/save", (req, res)=>{
	const source = req.body.source;
	if(!source){
		return res.json({success:false, message:"Pass proper params!"});
	}
	models.Code.create({
		user_id: req.session.userId,
		source: source
	})
		.then((code)=>{
			if(!code){
				return res.json({success:"false", message:"Internal server error!"});
			}
			//compile the code here and save the dll
			return res.json({success:true, message:"Code saved!"});
		});
});
router.get('/code_status', (req, res) => {
	let userId = req.session.userId;
	models.Code.findOne({
		where: {
			user_id: userId
		}
	})
		.then(code => {
			res.json({success: true, status: code.dataValues.status});
		})
		.catch(err => {
			res.json({success: false, message: "Internal server error"});
		})
});
module.exports = router;


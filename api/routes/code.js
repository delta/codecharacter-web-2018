"use strict";
const express = require("express");
const router = express.Router();
const models = require("../models");
const request = require("request");
const queueCompile = require('../utils/queueCompile');
/* GET home page. */
router.post("/", function(req, res) {
	const source = req.body.source;
	if(!source){
		return res.json({success:false, message:"Pass proper params!"});
	}
	//update if already
	models.Code.upsert({
		user_id: req.session.userId,
		source: source,
		status:'compiling'
	},{
		where:{
			user_id: req.session.userId,
		} 
	}) 
		.then((code)=>{
			//here compile code and save as dlls in code
			//just push the code and userID to the queue
			let success = queueCompile.pushToQueue(req.session.userId, source);
			console.log(success);
			if(!success){
				return res.json({success: false, message: "Please try again later!"});
			}
			if(!code){
				return res.json({success:true, message:"Updated!"});
			}
			return res.json({success:true, message:"Code saved!"});
		})
		.catch(err => {
			res.json({success: false, err: err});
		});
});
router.get("/", (req, res)=>{
  console.log(req.session.userId);
	models.Code.findOne({
		where: {user_id: req.session.userId}
	})
		.then((code)=>{
			if(!code){
				return res.json({success:false, message:"Oops, this user has no code saved!"});
			}
			if(code.dataValues.status === 'compiling'){
				return res.json({success:true, source:code.dataValues.source, status:'compiling'});
			}else if(code.dataValues.status === 'success'){
				//add these , dll1: code.dataValues.dll1, dll2: code.dataValues.dll2
				console.log({dll1: code.dataValues.dll1, dll2: code.dataValues.dll2});
				return res.json({success:true, source:code.dataValues.source, status: 'Success'});
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


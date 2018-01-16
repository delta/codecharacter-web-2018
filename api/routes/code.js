"use strict";
const express = require("express");
const router = express.Router();
const models = require("../models");
const request = require("request");
const queueCompile = require('../utils/queueCompile');
console.log(queueCompile.getQueueSize());
/* GET home page. */
router.post("/", function(req, res) {
	const source = req.body.source;
	if(!source){
		return res.json({success:false, message:"Pass proper params!"});
	}
	models.Code.create({
		user_id: req.session.userId,
		source: source,
		dll1:'',
		dll2:'',
		status:'compiling'
	})
		.then((code)=>{
			//here compile code and save as dlls in code
			//just push the code and userID to the queue
			queueCompile.pushToQueue(req.session.userId, source);
			console.log(queueCompile.compileQueue);
			if(!code){
				return res.json({success:"false", message:"Internal server error!"});
			}
			return res.json({success:true, message:"Code saved!"});
		});
});
router.get("/", (req, res)=>{
	models.Code.findOne({
		where: {user_id: req.session.userId}
	})
		.then((code)=>{
			if(!code){
				return res.json({success:false, message:"Oops, this user has no code saved!"});
			}
			return res.json({success:true, source:code.dataValues.source});
		});
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
module.exports = router;


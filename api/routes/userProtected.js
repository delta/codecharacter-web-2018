"use strict";
const express = require("express");
const router = express.Router();
const models = require("../models");
/* GET home page. */
router.get("/", function(req, res) {
	res.json({ title: "hey" });
});
router.get("/profile/:id", (req, res)=>{
	models.User.findOne({
		where:{id:req.params.id},
		attributes:["id", "name", "email"]
	})
		.then((user)=>{
			if(!user){
				res.json({success:false, message:"No users with this id"});
			}else{
				res.json({success:true, user:user.dataValues});
			}
		});
});
router.get('/notifications/:onlyUnread', (req, res) => {
	console.log(req.params);
	let onlyUnread = Number(req.params.onlyUnread);
	console.log(onlyUnread);
	let searchParams = {
		user_id: req.session.userId
	};
	if(onlyUnread){
		searchParams = {...searchParams, isRead:false};
	}
	models.Notification.findAll({
		where: searchParams,
		attributes: ['id', 'type', 'title', 'message', 'isRead', 'createdAt']
	})
		.then(notifications => {
			models.Notification.update({
				isRead: true
			},
			{
				where: {
					user_id: req.session.userId
				}
			})
				.then(() => {
					if(notifications && notifications.length){
						res.json({success: true, notifications:notifications});
					}else{
						res.json({success: true, message: 'No notifications for this user'});
					}
				})
				.catch(err => {
					throw err;
					res.json({success: false, message:'Internal server error!'});
				})
		})
		.catch(err => {
			console.log(err);
			res.json({success: false, message: 'Internal server error!'});
		});
})
router.post('/create_notification', (req, res) => {
	let userId = req.body.userId;
	let title = req.body.title;
	let description = req.body.description;
	let type = req.body.type;
	let isRead = false;
	console.log(title, description, type);
	if(!(title && description && type)){
		return res.json({success: false, message: "Pass proper params!"});
	}
	let notifications = [];
	if(!userId){
		models.User.findAll({
			where:{}, //get all players,
			attributes:['id']
		})
			.then((users) => {
				users.map(user => {
					notifications.push({
						title,
						message: description,
						type,
						isRead,
						user_id : user.id
					})
				});
				models.Notification.bulkCreate(notifications)
					.then(notifications => {
						res.json({success: true, message: 'Notification created!'});
					})
					.catch(err => {
						//throw err;
						console.log(err);
						res.json({success: false, message: 'Internal server error!'});
					})
			})
	}else{
		models.Notification.create({
			title,
			description,
			type,
			isRead,
			user_id: userId
		})
			.then(notification => {
				res.json({success: true, message: 'Notification created!'});
			})
			.catch(err => {
				res.json({success: false, message: "Internal server error"});
			})
	}
})
router.post('/delete_notification', (req, res) => {
	let nId = req.body.nId;
	if(nId < 0 || !nId ){
		return res.json({success: false, message: 'Pass proper params'});
	}
	models.Notification.destroy({
		where: {
			id: nId
		}
	})
		.then(success => {
			console.log(success);

			res.json({success:true, message : 'deletion successful!' })
		})
		.catch(err => {
			console.log('hey');
			res.json({success:false, message : 'Deletion failed!' })	;
		})
});
module.exports = router;

"use strict";
const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/", (req, res)=>{
	models.User.findAll({
		attributes:["id", "name","rating"]
	})
		.then((users)=>{
			let ratings = [];
			users.map((user) => {
				let retObj = Object.assign({}, {
					name: user.dataValues.name,
					id: user.dataValues.id,
					rating: user.dataValues.rating
				});
				ratings.push(retObj);
			});
			users.sort((user1, user2) => {
				if(user1.rating > user2.rating){
					return -1;
				}else if(user1.rating < user2.rating){
					return 1;
				}
				return 0;
			});
			res.json({success:true, ratings});
		})
		.catch(() => {
			res.json({success:false, message:"internal server error"});
		});
});

router.get('/chunk/:from/:strength', (req, res) => {
  console.log(req.params.from, req.params.strength);
	models.User.findAll({
		where: {},
		order: ['rating'],
		offset: Number(req.params.from),
		limit: Number(req.params.strength)
	})
		.then( users => {
			res.json({users});
		})
		.catch(err => {
			console.log(err);
			res.json(err);
		})
})
module.exports = router;

"use strict";
const express = require("express");
const router = express.Router();
const models = require("../models");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get("/", (req, res) => {
	models.User.findAll({
		attributes: ["id", "name", "rating", "nationality"]
	})
		.then((users) => {
			let codeFetchPromises = [];
			let usersWithLockedCode = [];
			users.map(user => {
				let x = models.Code.findOne({
					where: {
						user_id: user.id
					}
				})
					.then(code => {
						if (!code) {
							return;
						}
						if (code.dll1_locked) {
							usersWithLockedCode.push(user);
						}
					})
					.catch(err => {
						console.log(err);
						res.json({ success: false, message: 'Please try later!' });
					});

				codeFetchPromises.push(x);
			})
			let ratings = [];
			Promise.all(codeFetchPromises)
				.then(dataReturned => {
					let count = 1;
					let latestRating = -1;
					usersWithLockedCode.map((user) => {
						latestRating = user.dataValues.rating;
						let retObj = Object.assign({}, {
							name: user.dataValues.name,
							id: user.dataValues.id,
							rating: user.dataValues.rating,
              nationality: user.dataValues.nationality
						});
						ratings.push(retObj);
					});
					ratings.sort((user1, user2) => {
						if (user1.rating > user2.rating) {
							return -1;
						} else if (user1.rating < user2.rating) {
							return 1;
						}
						if (user1.name > user2.name) {
							return -1;
						} else {
							return 1;
						}
						return 0;
					});
					let rank=1;
					let equalrating=-1;
					ratings.map((ratingReturn) => {
						if(equalrating==-1){
							equalrating=ratingReturn.rating
							ratingReturn.rank=rank;
						}else{
							if(equalrating==ratingReturn.rating){
								ratingReturn.rank=rank;
								count++;
							}else{
								rank+=count;
								ratingReturn.rank=rank;
								equalrating=ratingReturn.rating;
								count=1;
							}
						}
						return ratingReturn;
					});
					res.json({ success: true, ratings });
				})
				.catch(err => {
					console.log(err);
					res.json({ success: false, message: 'Please try later!' });
				});
		})
		.catch((err) => {
			console.log(err);
			res.json({ success: false, message: "internal server error" });
		});
});

router.get('/chunk/:from/:strength', (req, res) => {
	models.User.findAll({
		where: {},
		order: ['rating'],
		attributes: ['id', 'name', 'rating']
	})
		.then(users => {
			users.sort((user1, user2) => {
				if (user1.dataValues.rating > user2.dataValues.rating) {
					return -1;
				} else {
					return 1;
				}
			});
			//console.log(users);
			//users = users.reverse();
			let codeFetchPromises = [];
			let usersWithLockedCode = [];
			users.map(user => {
				let x = models.Code.findOne({
					where: {
						user_id: user.id
					}
				})
					.then(code => {
						if (!code) {
							return;
						}
						if (code.dll1_locked) {
							usersWithLockedCode.push(user);
						}
					})
					.catch(err => {
						console.log(err);
						res.json({ success: false, message: 'Please try later!' });
					});

				codeFetchPromises.push(x);
			})
			let ratings = [];
			//console.log(codeFetchPromises);
			Promise.all(codeFetchPromises)
				.then(dataReturned => {
					//console.log(dataReturned, 'fuck every piece of shit, oh me included');
					usersWithLockedCode.map((user) => {
						let retObj = Object.assign({}, {
							name: user.dataValues.name,
							id: user.dataValues.id,
							rating: user.dataValues.rating
						});
						ratings.push(retObj);
					});
					ratings.sort((user1, user2) => {
						if (user1.rating > user2.rating) {
							return -1;
						} else if (user1.rating < user2.rating) {
							return 1;
						}
						if (user1.name > user2.name) {
							return -1;
						} else {
							return 1;
						}
					});
					ratings = ratings.slice(req.params.from, req.params.strength);
					res.json({ success: true, ratings });
				})
				.catch(err => {
					console.log(err);
					res.json({ success: false, message: 'Please try later!' });
				});
		})
		.catch(err => {
			console.log(err);
			res.json(err);
		})
})
router.get('/search/:pattern/:limit', (req, res) => {
	//console.log(req.params.pattern);
	models.User.findAll({
		where: {
			name: {
				[Op.like]: req.params.pattern + '%'
			}
		},
		order: ['rating'],
		limit: Number(req.params.limit)
	})
		.then(users => {
			res.json({ users });
		})
		.catch(err => {
			console.log(err);
			res.json(err);
		})
})
module.exports = router;

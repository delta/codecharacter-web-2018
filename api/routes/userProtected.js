<<<<<<< HEAD
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
=======
"use strict"
const express = require('express');
const router = express.Router();
const models = require('../models');
/* GET home page. */
router.get('/', function(req, res) {
	res.json({ title: 'hey' });
});
router.get('/profile/:id', (req, res)=>{
	models.User.findOne({
		where:{id:req.params.id},
		attributes:['id', 'name', 'email']
>>>>>>> 5f315c6... Add authorization
	})
		.then((user)=>{
			if(!user){
				res.json({success:false, message:"No users with this id"});
			}else{
				res.json({success:true, user:user.dataValues});
			}
<<<<<<< HEAD
		});
});
=======
		})
})
>>>>>>> 5f315c6... Add authorization
module.exports = router;

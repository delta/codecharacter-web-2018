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
	})
		.then((user)=>{
			if(!user){
				res.json({success:false, message:"No users with this id"});
			}else{
				res.json({success:true, user:user.dataValues});
			}
		})
})
module.exports = router;

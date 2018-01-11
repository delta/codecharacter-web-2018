"use strict";
const express = require("express");
const router = express.Router();
const models = require("../models");

router.get('/:matchId', (req, res)=>{
  let matchId = req.params.matchId;
  models.Match.findOne({
    where:{
      id: matchId
    }
  })
    .then(match => {
      res.json({success: true, match});
      //send logs after executing
    })
    .catch(err => {
      res.json({success: false, message:'Fetch failed!'});
    });
});

router.post('/ai', (req, res) => {
  let dll1 = req.params.dll1;
  let dll2 = req.params.dll2;
  models.Ai.create({
    dll1,
    dll2
  })
    .then(() => {
      res.json({success: true});
    })
    .catch(err => {
      res.json({success: false, message: "Save failed!"});
    })
});
"use strict";
const express = require("express");
const router = express.Router();
const models = require("../models");

router.get('/get_matches', (req, res) => {
  let userId = req.session.userId;
  models.Match.findOne({
    where:{
      $or:[
        {
          player_id1: userId
        },
        {
          player_id2: userId
        }
      ]
    }
  })
    .then(matches => {
      res.json({matches});
    })
    .catch(err => {
      res.json({err});
    })
});
router.get('/get_ais', (req, res) =>{
  let userId = req.session.userId;
  models.Ai.findAll({
    attributes:['id']
  })
    .then(ais =>{
      res.json({ais})
    })
    .catch(err => {
      res.json({err});
    })
});
router.get('/:matchId', getMatchHandler);
router.get('/:opponentId', getMatchHandler);

router.get('/match_status/:matchId', (req, res) => {
  let matchId = req.params.matchId;
  models.Match.findOne({
    where:{
      id: matchId
    },
    attributes: ['status']
  })
    .then(match => {
      res.json({success: true, status: match.status});
      //send logs after executing
    })
    .catch(err => {
      res.json({success: false, message:'Fetch failed!'});
    });
});
router.get('/compete/player', (req, res) => {
  let userId = req.session.userId;
  let competetorId = req.body.againstId;
  Code.findOne({
    where:{
      user_id: userId
    },
    attributes: ['dll1']
  })
    .then(code1 => {
      Code.findOne({
        where:{
          user_id: competetorId
        },
        attributes: ['dll2']
      })
        .then(code2 => {
          //execute code1.dll1, code2.dll2
        })
        .catch(err => {
          res.json({success: false, message: "Internal server error!"});
        });
    })
    .catch(err => {
      res.json({success: false, message: "Internal server error!"});
    })
  //get 2 dlls
  //execute them and send back
});
router.get('/compete/ai', (req, res) => {
  let userId = req.session.userId;
  let aiId = req.body.aiId;
  //get 2 dlls
  //execute them and send back
  Code.findOne({
    where:{
      user_id: userId
    },
    attributes: ['dll1']
  })
    .then(code1 => {
      Ai.findOne({
        where:{
          id: aiId
        },
        attributes: ['dll2']
      })
        .then(code2 => {
          //execute code1.dll1, code2.dll2
        })
        .catch(err => {
          res.json({success: false, message: "Internal server error!"});
        });
    })
    .catch(err => {
      res.json({success: false, message: "Internal server error!"});
    })
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
module.exports = router;

function getMatchHandler(req, res){
  let matchId = req.params.matchId;
  let opponentId = req.params.opponentId;
  let userId = req.session.userId;
  models.Match.findOne({
    where:{
      $or:[
        {id: matchId},
        {
          player_id1: userId,
          player_id2: opponentId
        },
        {
          player_id1: opponentId,
          player_id2: userId
        }
      ]
    }
  })
    .then(match => {
      res.json({success: true, match});
      //send logs after executing
    })
    .catch(err => {
      res.json({success: false, message:'Fetch failed!'});
    });
}

"use strict";
const express = require("express");
const router = express.Router();
const models = require("../models");

const queueExecute = require('../utils/queueExecute');
router.get('/get_matches', (req, res) => {
  let userId = req.session.userId;
  models.Match.findAll({
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
router.get('/get_latest_match_id', (req, res) => {
  let userId = req.session.userId;
  models.Match.findAll({
    where:{
      $or:[
        {
          player_id1: userId
        },
        {
          player_id2: userId
        }
      ]
    },
    order:['updatedAt'],
    attributes: ['id']
  })
    .then(matches => {
      res.json({match: matches[matches.length - 1]});
    })
    .catch(err => {
      res.json({err});
    })
})
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
router.get('/compete/player/:againstId', (req, res) => {
  let userId = req.session.userId;
  let competetorId = Number(req.params.againstId);
  if(userId === competetorId){
    return res.json({success: false, message: "You can't compete with yourself!"})
  }
  console.log(userId, competetorId);
  models.Code.findOne({
    where:{
      user_id: userId
    },
    attributes: ['dll1_locked']
  })
    .then(code1 => {
      if(!code1 && (code1.status === 'SUCCESS')){
        return res.json({success: false, message: 'Upload a working code first!'});
      }
      models.Code.findOne({
        where:{
          user_id: competetorId
        },
        attributes: ['dll2_locked']
      })
        .then(code2 => {
          if(!code2 && (code1.status === 'SUCCESS')){
            return res.json({success: false, message: 'Your opponent doesn\'t have a working code yet!'});
          }
          //execute code1.dll1, code2.dll2
          let dll1 = code1.dll1_locked;
          let dll2 = code2.dll2_locked;
          if(!dll1){
            return res.json({success: false, message: "Please lock your code and proceed!"});
          }
          if(!dll2){
            return res.json({success: false, message:'Your opponent hasn\'t locked the code yet'});
          }
          models.Match.create({
            player_id1: userId,
            player_id2: competetorId,
            dll1,
            dll2,
            status: 'executing'
          })
            .then(matchSaved => {
              models.Notification.create({
                type: 'INFORMATION' ,
                title: 'Match Initiated',
                message:`User with id ${userId} has initiated a match.`,
                isRead: false,
                user_id: competetorId
              })
                .then(notification => {
                  //idk what to do here
                })
                .catch(err => {
                  console.log(err);
                })
              console.log(matchSaved.id, matchSaved.player_id1, 'test2');
              let success = queueExecute.pushToQueue(matchSaved.id, dll1, dll2, matchSaved.player_id1, matchSaved.player_id2);
              if(success){
                res.json({success: true, message: 'Match is executing'});
              }else{
                res.json({success: false, message: 'Try after sometime!'});  
              }
            })
            .catch(err => {
              console.log(err);
              res.json({success: false, message: 'Try after sometime!'});
            });
        })
        .catch(err => {
          console.log(err);
          res.json({success: false, message: "Internal server error!"});
        });
    })
    .catch(err => {
      console.log(err);
      res.json({success: false, message: "Internal server error!"});
    })
  //get 2 dlls
  //execute them and send back
});
router.get('/compete/ai/:ai_id', (req, res) => {
  //ALWAYS COMPILE AND RUN
  let userId = req.session.userId;
  let aiId = req.params.ai_id;
  if(!aiId){
    return res.json({success: false, message: 'Pass proper params!'});
  }
  //get 2 dlls
  //execute them and send back
  models.Code.findOne({
    where:{
      user_id: userId
    },
    attributes: ['dll1']
  })
    .then(code1 => {
      models.Ai.findOne({
        where:{
          id: aiId
        },
        attributes: ['dll2']
      })
        .then(code2 => {
          let dll1 = code1.dll1;
          let dll2 = code2.dll2;
          if(!dll1){
            return res.json({success: false, message: "Please successfully compile your code.!"});
          }
          if(!dll2){
            return res.json({success: false, message:'Ask administrator to add this AI!'});
          }
          models.Match.create({
            player_id1: userId,
            ai_id: aiId,
            dll1,
            dll2,
            status: 'executing'
          })
            .then(matchSaved => {
              console.log(matchSaved.id, matchSaved.player_id1, 'test2');
              let success = queueExecute.pushToQueue(matchSaved.id, dll1, dll2, matchSaved.player_id1, aiId, true);
              if(success){
                res.json({success: true, message: 'Match is executing'});
              }else{
                res.json({success: false, message: 'Try after sometime!'});  
              }
            })
            .catch(err => {
              console.log(err);
              res.json({success: false, message: 'Try after sometime!'});
            });
          //res.json({success: true, message:'Dummy log1'});
          //execute code1.dll1, code2.dll2
          //res.json({success: true, message:'Dummy log'});
        })
        .catch(err => {
          console.log(err, 1);
          res.json({success: false, message: "Internal server error!"});
        });
    })
    .catch(err => {
      res.json({success: false, message: "Internal server error!"});
    })
});
router.get('/compete/self', (req, res) => {
  let userId = req.session.userId;
  models.Code.find({
    where: {
      user_id: userId
    }
  })
    .then(code => {
      if(!code){
        return res.json({success: false, message: 'Compile the code first.'});
      }
      let dll1 = code.dll1;
      let dll2 = code.dll2;
      if(!dll1 || !dll2){
        return res.json({success: false,  message:'Upload a good code first!'});
      }
       models.Match.create({
          player_id1: userId,
          player_id2: userId,
          dll1,
          dll2,
          status: 'executing'
        })
          .then(matchSaved => {
            console.log(matchSaved.id, matchSaved.player_id1, 'test2');
            let success = queueExecute.pushToQueue(matchSaved.id, dll1, dll2, matchSaved.player_id1, matchSaved.player_id1, true);
            if(success){
              res.json({success: true, message: 'Match is executing'});
            }else{
              res.json({success: false, message: 'Try after sometime!'});  
            }
          })
          .catch(err => {
            console.log(err);
            res.json({success: false, message: 'Try after sometime!'});
          });
    })
})
//no use of the following for now
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

"use strict";
const express = require("express");
const router = express.Router();
const models = require("../models");
const zlib = require("zlib");
const queueExecute = require('../utils/queueExecute');
const Op = require('sequelize').Op;
let WAIT_TIME_CHALLENGE;
models.Constant.findOne({
  where: {
    key: 'WAIT_TIME_CHALLENGE'
  }
})
  .then(constant => {
    WAIT_TIME_CHALLENGE = constant.value;
    if(!constant){
      WAIT_TIME_CHALLENGE = 30;
    }
  })
  .catch(err => {
    WAIT_TIME_CHALLENGE = 30;
  })
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
      ],
      status: {
        [Op.not]: 'EXECUTING'
      }
      /*
        ,
      ai_id: null,
      $not: {
        player_id1: userId,
        player_id2: userId
      }
      */
    },
    attributes: ['id', 'player_id1', 'player_id2', 'ai_id', 'createdAt', 'updatedAt', 'scorep1', 'scorep2', 'status']
  })
    .then(matches => {
      //res.json({matches});
      let fetchPromises = []

      let matchesModified = [];
      let x = matches.map(match => {
        if((match.player_id1 === match.player_id2) || (match.ai_id != null)) return;
        let competetorId = match.player_id2 === userId ? match.player_id1 : match.player_id2;
        let x = models.User.findAll({
          where: {
            $or:[
            {
              id: userId
            },
            {
              id: competetorId
            }
            ]
          },
          attributes:['id', 'name', 'rating']
        })
          .then(users => {
            let usersFetched = users.map(user => {return user.dataValues});
            let player1 = (usersFetched[0].id === match.player_id1) ? usersFetched[0] : usersFetched[1];
            let player2 = (usersFetched[0].id === match.player_id2) ? usersFetched[0] : usersFetched[1];
            usersFetched[0] = player1;
            usersFetched[1] = player2;
            match.dataValues.users = usersFetched;
            matchesModified.push(match);
          })
          .catch(err => {
            console.log(err);
            res.json({success: false})
          });
        fetchPromises.push(x);
      })
      Promise.all(fetchPromises).then(promises => {
        //console.log('hey');
        matchesModified = matchesModified.map(match => {return match.dataValues});
        matchesModified.sort((match1, match2) => {
          let time1 = match1.updatedAt;
          let time2 = match2.updatedAt;
          if(time1.getTime() > time2.getTime()){
            return -1;
          }else{
            return 1;
          }
        });
        res.json({matchesModified});
      })
    })
    .catch(err => {
      console.log(err);
      res.json({success: false, message: 'Please try later!'});
    })
});
router.get('/get_match/:matchId', (req, res) => {
   models.Match.findOne({
    where:{
      id: req.params.matchId
    },
    attributes: ['id', 'player_id1', 'player_id2', 'ai_id', 'createdAt', 'updatedAt', 'status','player1_dlog', 'player2_dlog', 'log']
  })
    .then(match => {
      res.json({match});
    })
    .catch(err => {
      console.log(err);
      res.json({err});
    })
})
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
      console.log(err);
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
      console.log(err);
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
      console.log(err);
      res.json({success: false, message:'Fetch failed!'});
    });
});
router.get('/compete/player/:againstId', (req, res) => {
  let userId = req.session.userId;
  let competetorId = Number(req.params.againstId);
  if(userId === competetorId){
    return res.json({success: false, message: "You can't compete with yourself!"})
  }
  //console.log(userId, competetorId);
  models.Match.findAll({
    where: {
      player_id1 : userId,
      player_id2: competetorId
    },
    order: ['updatedAt'],
    attributes: ['id', 'createdAt', 'updatedAt']
  })
    .then(matches => {
      let mostRecent = matches.pop();
      let now = new Date();
      if(mostRecent){
        if((now.getTime() - mostRecent.createdAt.getTime()) < WAIT_TIME_CHALLENGE*60*1000){
          //console.log();
          let timeLeft = WAIT_TIME_CHALLENGE - (now.getTime() - mostRecent.updatedAt.getTime() )/60000;
          let minutes = Math.floor(timeLeft);
          let seconds = Math.floor((timeLeft - minutes) * 60);
          return res.json({success: false, message: 'Please wait for '+ minutes + ' minutes and '+ seconds + ' seconds ' + 'to start a match with this user again', time_left: WAIT_TIME_CHALLENGE - (now.getTime() - mostRecent.updatedAt.getTime() )/60000, minutes, seconds});
        }
      }
      models.Code.findOne({
        where:{
          user_id: userId
        },
        attributes: ['dll1_locked']
      })
        .then(code1 => {
          if(!code1){
            return res.json({success: false, message: 'You must submit code first!'});
          }
          if(code1.status === 'SUCCESS'){
            return res.json({success: false, message: 'You must submit code first!'});
          }
          models.Code.findOne({
            where:{
              user_id: competetorId
            },
            attributes: ['dll2_locked']
          })
            .then(code2 => {
              if(!code2){
				  return res.json({success: false, message: 'This player hasn\'t submitted any code yet, so you can\'t challenge them'});
              }
              if(code2.status === 'SUCCESS'){
                return res.json({success: false, message: 'This player hasn\'t submitted any code yet, so you can\'t challenge them'});
              }
              //execute code1.dll1, code2.dll2
              let dll1 = code1.dll1_locked;
              let dll2 = code2.dll2_locked;
              if(!dll1){
                return res.json({success: false, message: "You must submit code first."});
              }
              if(!dll2){
                return res.json({success: false, message:'This player hasn\'t submitted any code yet, so you can\'t challenge them'});
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
                  let successPromise = queueExecute.pushToQueue(matchSaved.id, dll1, dll2, matchSaved.player_id1, matchSaved.player_id2);
                  successPromise.then(success => {
                    if(success){
                      res.json({success: true, message: 'The match is running'});
                    }else{
                      res.json({success: false, message: 'There seems to be a server error. Please try again later!'});
                    }
                  })

                })
                .catch(err => {
                  console.log(err);
                  res.json({success: false, message: 'There seems to be a server error. Please try again later!'});
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
    })
    .catch(err => {
      console.log(err);
      res.json({success: false, message: 'Internal server error'});
    });

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
            return res.json({success: false, message: "Unfortunately, your code didn't compile successfully."});
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
              let success = queueExecute.pushToQueue(matchSaved.id, dll1, dll2, matchSaved.player_id1, Number(aiId), true);
              if(success){
                res.json({success: true, message: 'Your game is running'});
              }else{
                res.json({success: false, message: 'Server error, please try again later :('});
              }
            })
            .catch(err => {
              console.log(err);
              res.json({success: false, message: 'Try after sometime!'});
            });
        })
        .catch(err => {
          console.log(err, 1);
          res.json({success: false, message: "Internal server error!"});
        });
    })
    .catch(err => {
      console.log(err);
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
        return res.json({success: false, message: 'Unfortunately, your code didn\'t compile. Try again'});
      }
      let dll1 = code.dll1;
      let dll2 = code.dll2;
      if(!dll1 || !dll2){
        return res.json({success: false,  message:'Unfortunately, your code didn\'t compile. Try again'});
      }
       models.Match.create({
          player_id1: userId,
          player_id2: userId,
          dll1,
          dll2,
          status: 'executing'
        })
          .then(matchSaved => {
            let success = queueExecute.pushToQueue(matchSaved.id, dll1, dll2, matchSaved.player_id1, matchSaved.player_id1, true);
            if(success){
              res.json({success: true, message: 'Your game is running'});
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
router.get('/error_status/:match_id', (req, res) => {
  //params
  let matchId = req.params.match_id;
  if(!matchId){
    return res.json({success: false, message: 'Return with proper params!'});
  }
  models.Match.find({
    where: {
      id: matchId
    }
  })
    .then(match => {
      if(match.status === "ERROR"){
        res.json({success: true, error: match.error_log});
      }else{
        res.json({success: false, message:'No errors to fetch'});
      }
    })
})
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
      console.log(err);
      res.json({success: false, message:'Fetch failed!'});
    });
}

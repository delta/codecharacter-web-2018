let executeQueueSize = 100;
let executeQueue = [];
const models = require("../models");
const request = require("request");
let requestUnderway = false;
const secretString = require("../config/serverConfig").cookieKey;
const EloRank = require('elo-rank');
const elo = new EloRank(32);
let pushToQueue = (matchId, dll1, dll2, userId, opponentId, isAi) => {
	if(executeQueue.length === executeQueueSize){
		return false;
	}else{
		console.log(userId, 'hey');
		executeQueue.push({
			dll1,
			dll2,
			matchId,
			userId,
			opponentId,
			isAi
		});
		console.log(executeQueue);
		return true;
	}
}

/*let popCode = (userId) => {
	executeQueue.map((element, index) => {
		if(element.userId === userId){
			let poppedCode = executeQueue.splice(index, 1);
			return poppedCode;
		}
	});
}*/

let getQueueSize = () => {
	return executeQueue.length;
}
module.exports = {
	executeQueue,
	pushToQueue,
	getQueueSize
};

//write watcher for executeQueue
setInterval(() => {
	if(requestUnderway){
		return;
	}
	if(getQueueSize()){
		let codeToBeExecuted = executeQueue[0];
		let userId = executeQueue[0].userId; //say this dude wins
		let opponentId = executeQueue[0].opponentId;
		let isAi = executeQueue[0].isAi;
		requestUnderway = true;
		request(
			{
				method:'POST',
				url: 'http://localhost:3002/execute',
				json: true,
				body: {...codeToBeExecuted, secretString}
			}, (err, response, body) =>{
				if(!response){
					return;
				}
        let results = response.body.results;
        console.log(results);
        results = results.split(' ').slice(1);
        let player1ExitStatus = results[1];
        let player2ExitStatus = results[3];
        let player1Score =  results[0];
        let player2Score =  results[2];
        let player1Dlog = response.body.player1LogCompressed.data;
        let player2Dlog = response.body.player2LogCompressed.data; //idk if it should be .data
        player2ExitStatus = player2ExitStatus.replace('\r', '');
        let runtimeErrorPresent = player2ExitStatus === 'UNDEFINED' || player1ExitStatus === 'UNDEFINED' || player1ExitStatus === 'EXCEEDED_INSTRUCTION_LIMIT' || player2ExitStatus === 'EXCEEDED_INSTRUCTION_LIMIT';

        //sort message and 
				models.User.findOne({
					where: {
						id: userId
					}
				})
					.then(user1 => {
						models.User.findOne({
							where: {
								id:opponentId
							}
						})
							.then(user2 => {
								if(err) throw err;
								if(!body.success || runtimeErrorPresent){
									models.Match.update({
											status: 'error',
											error_log: body.error
										},
										{
											where:{
												id: matchId
											}
										}
									)
										.then(match => {
											console.log(match);
											models.Notification.create({
												type: 'ERROR'	,
												title: 'Execution Error',
												message: (player2ExitStatus === 'UNDEFINED' || player2ExitStatus === 'EXCEEDED_INSTRUCTION_LIMIT') ? (player2ExitStatus === 'EXCEEDED_INSTRUCTION_LIMIT' ? 'Simplify to a less complex code': 'Play timeout!') : (player2ExitStatus === 'EXCEEDED_INSTRUCTION_LIMIT' ? 'Simplify to a less complex code': 'Play timeout!'),
												isRead: false,
												user_id: userId
											})
												.then(notification => {
													//idk what to do here
													if( (player2ExitStatus === 'UNDEFINED' || player2ExitStatus === 'EXCEEDED_INSTRUCTION_LIMIT')){
														models.Notification.create({
															type: 'ERROR'	,
															title: 'Execution Error',
															message:(player2ExitStatus === 'EXCEEDED_INSTRUCTION_LIMIT' ? 'Simplify to a less complex code': 'Play timeout!'),
															isRead: false,
															user_id: opponentId
														})
															.then(notification => {
																//idk what to do here
																
															})
															.catch(err => {
																console.log(err);
															})
													}
													
												})
												.catch(err => {
													console.log(err);
												})
										})
										.catch(err => {
											throw err;
											console.log(err);
										})
								}else{

									if((userId === opponentId)  || isAi ){
										return;
									}
									let score1 = user1.rating;
					        let score2 = user2.rating;
					        console.log(score1, score2);
					        let expec1 = elo.getExpected(score1, score2);
					        let expec2 = elo.getExpected(score2, score1);
					        console.log(expec2, expec1);
					        if(player2Score > player1Score){
					        	score1 = elo.updateRating(expec1, 0, score1);
					          score2 = elo.updateRating(expec2, 1, score2);
					        }else if(player2Score < player1Score){
					        	score1 = elo.updateRating(expec1, 1, score1);
					          score2 = elo.updateRating(expec2, 0, score2);
					        }else{
					        	score1 = elo.updateRating(expec1, 0.5, score1);
					          score2 = elo.updateRating(expec2, 0.5, score2);
					        }
					        console.log(score1, score2);
									//handle scores
									//create appropriate notifications
									let matchId = response.body.matchId;
									requestUnderway = false;
									executeQueue.shift();
									//console.log(body);
									console.log(userId, matchId, 'test1');
								
									models.Match.update({
											status: 'success',
											log: body.log.data,
											player1_dlog: player1Dlog,
											player2_dlog: player2Dlog,
											scorep1:player1Score,
											scorep2:player2Score
										},
										{
											where:{
												id: matchId
											}
										}
									)
										.then(match => {
											console.log(match);
											

											models.User.update({
												rating : score1
											},
											{
												where: {
													id: userId
												}
											})
												.then(success => {
													if(success){
														console.log('User1 score update successful');
													}
													models.User.update({
														rating: score2
													},
													{
														where: {
															id: opponentId
														}
													})
														.then(success => {
															if(success){
																console.log('User2 score update successful');
																let notification1 = models.Notification.create({
																	type: 'SUCCESS'	,
																	title: 'Executed successfully!',
																	message: `Your match with ${opponentId} has executed successfully and your score was ${player1Score} `,
																	isRead: false,
																	user_id: userId
																})
																let notification2 = models.Notification.create({
																	type: 'SUCCESS'	,
																	title: 'Executed successfully!',
																	message: `Your match with ${userId} has executed successfully and your score was ${player2Score} `,
																	isRead: false,
																	user_id: opponentId
																})
																let notificationsPromise = [];
																Promise.all(notificationsPromise)
																	.then((values, values2) => {
																		console.log(values, values2);
																	})
															}
														})
														.catch(err => {
															console.log(err);
														})
												})
												.catch(err => {
													console.log(err);
												})
										})
										.catch(err => {
											throw err;
											console.log(err);
										})
								}
							})
							.catch(err => {
								console.log(err);
							})
					})
					.catch(err => {
						console.log(err);
					})
				//console.log(err, body);
				//console.log(Buffer.from(response.body.dll1Encoded, 'base64'));
			});
		//api call and pop() when necessary
	}
}, 300);

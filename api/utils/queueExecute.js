let executeQueueSize = 100;
let executeQueue = [];
const models = require("../models");
const request = require("request");
let requestUnderway = false;
const secretString = require("../config/serverConfig").cookieKey;
const compileBoxUrl = require("../config/serverConfig").compileBoxUrl;
const EloRank = require('elo-rank');
const elo = new EloRank(32);
const pako = require('pako');
let pushToQueue = (matchId, dll1, dll2, userId, opponentId, isAi) => {

	let queueLength = getQueueSize();

	if(queueLength === executeQueueSize){
		return Promise.resolve(false);
	}else{
		let success;
		return models.ExecuteQueue.create({
			dll1,
			dll2,
			matchId,
			userId,
			opponentId,
			isAi,
			createdAt: new Date(),
			updatedAt: new Date()
		})
			.then(compileQueueElement => {
				return true;
			})
			.catch(err => {
				console.log(err);
				return false;
			})
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
	return models.ExecuteQueue.findAll({
		attributes: ['id']
	})
		.then(executeQueueElements => {
			return executeQueueElements.length;
		})
		.catch(err => {
			console.log(err);
		})
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
	getQueueSize()
		.then(queueSize => {
			if(queueSize){
				processQueue()
				.then(codeToBeExecuted => {

					let userId = codeToBeExecuted.userId; //say this dude wins
					let opponentId = codeToBeExecuted.opponentId;
					let isAi = codeToBeExecuted.isAi;
					let matchId = codeToBeExecuted.matchId;
					requestUnderway = true;
					try{
						request(
							{
								method:'POST',
								url: compileBoxUrl + '/execute',
								json: true,
								body: {...codeToBeExecuted.dataValues, secretString}
							}, (err, response, body) =>{
							  // let results, player1ExitStatus, player2ExitStatus, player1Score, player2Score, player1Dlog, player2Dlog, runtimeErrorPresent;

								if(!response){
									models.Notification.create({
											type: 'ERROR'	,
											title: 'Server Error',
											message: 'Our server seems to be having some trouble, please stay with us while we fix this!',
											isRead: false,
											user_id: Number(userId)
										})
									models.Notification.create({
											type: 'ERROR'	,
											title: 'Server Error',
											message: 'Our server seems to be having some trouble, please stay with us while we fix this!',
											isRead: false,
											user_id: Number(opponentId)
										})
									console.log("Please start the compilebox", response);
                  requestUnderway = false;
									return;
								}
				//				console.log(response.body)
								let results, player1Score, player2Score, player2ExitStatus, player1ExitStatus, player1Dlog, player2Dlog, runtimeErrorPresent;
				        results = response.body.results;
				        //console.log(results);
				        if(response.body.success){
				        	//console.log(1);
				        	results = results.split(' ').slice(1);
					        player1ExitStatus = results[1];
					        player2ExitStatus = results[3];
					        player1Score =  parseInt(results[0]);
					        player2Score =  parseInt(results[2]);
					        player1Dlog = response.body.player1LogCompressed;
					        player2Dlog = response.body.player2LogCompressed; //idk if it should be .data
					        player2ExitStatus = player2ExitStatus.replace('\r', '');
					        runtimeErrorPresent = player2ExitStatus === 'UNDEFINED' || player1ExitStatus === 'UNDEFINED' || player1ExitStatus === 'EXCEEDED_INSTRUCTION_LIMIT' || player2ExitStatus === 'EXCEEDED_INSTRUCTION_LIMIT';
				        }else{
				        	//console.log(2);
				        	//console.log(response.body);
				        	runtimeErrorPresent = true;
				        	player1ExitStatus = 'UNDEFINED';
				        	player2ExitStatus = 'UNDEFINED';
				        }
				        //console.log('hey');
				        //console.log(response.body);

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
												if(err) console.log(err);
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
															//console.log(match);
															models.Notification.create({
																type: 'ERROR'	,
																title: 'Execution Error',
																message: (player1ExitStatus === 'UNDEFINED' || player1ExitStatus === 'EXCEEDED_INSTRUCTION_LIMIT') ? (player2ExitStatus === 'EXCEEDED_INSTRUCTION_LIMIT' ? 'You have exceeded your instruction limit, so your code is taking too long to execute! Read the docs for more information.': 'Runtime error! Please check your code.') : (player2ExitStatus === 'EXCEEDED_INSTRUCTION_LIMIT' ? 'You have exceeded your instruction limit, so your code is taking too long to execute! Read the docs for more information.': 'Runtime error! Please check your code.'),
																isRead: false,
																user_id: userId
															})
																.then(notification => {
																	//idk what to do here
																	if( (player2ExitStatus === 'UNDEFINED' || player2ExitStatus === 'EXCEEDED_INSTRUCTION_LIMIT')){
																		models.Notification.create({
																			type: 'ERROR'	,
																			title: 'Execution Error',
																			message:(player2ExitStatus === 'EXCEEDED_INSTRUCTION_LIMIT' ? 'You have exceeded your instruction limit, so your code is taking too long to execute! Read the docs for more information.': 'Runtime error! Please check our code.'),
																			isRead: false,
																			user_id: opponentId
																		})
																			.then(notification => {
																				//idk what to do here
																				//executeQueue.splice(indexToBeProcessed, 1);
																				models.ExecuteQueue.destroy({
																					where: {
																						id: codeToBeExecuted.id
																					}
																				})
																				requestUnderway = false;
																			})
																			.catch(err => {
																				//console.log(err);
																			})
																	}

																})
																.catch(err => {
																	//console.log(err);
																})
														})
														.catch(err => {
															throw err;
															//console.log(err);
														})
												}else{

													let score1 = user1.rating;
									        let score2 = user2.rating;
									        //console.log(score1, score2);
									        let expec1 = elo.getExpected(score1, score2);
									        let expec2 = elo.getExpected(score2, score1);
									        //console.log(expec2, expec1);
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
									        //console.log(score1, score2);
													//handle scores
													//create appropriate notifications
													let matchId = response.body.matchId;
													//executeQueue.splice(indexToBeProcessed, 1);
													models.Match.update({
															status: 'success',
															log: body.log.data,
															player1_dlog: player1Dlog.data,
															player2_dlog: player2Dlog.data,
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
															//requestUnderway = false; //might cause some trouble here, ser requestUnderway true here and once notifications are updated
															models.ExecuteQueue.destroy({
																where: {
																	id: codeToBeExecuted.id
																}
															})
															if((userId === opponentId)  || isAi ){

																/*
																models.Notification.create({
																	type: 'SUCCESS'	,
																	title: 'Executed successfully!',
																	message: `Your game was a success! You'll see your result shortly.`,
																	isRead: false,
																	user_id: userId
																})*/
																requestUnderway = false;
																return;
															}


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
																		//console.log('User1 score update successful');
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
																				//console.log('User2 score update successful');
																				if (player1Score < player2Score) {
																					let notification1 = models.Notification.create({
																						type: 'INFORMATION',
																						title: 'Lost Game',
																						message: `You lost ${player1Score}-${player2Score} to ${user2.name}. View your match <a href="/matches/${matchId}">here</a>, or from the matches tab.`,
																						isRead: false,
																						user_id: userId
																					});
																					let notification2 = models.Notification.create({
																						type: 'SUCCESS'	,
																						title: 'Won Game!',
																						message: `Your won ${player2Score}-${player1Score} to ${user1.name}. View your match <a href="/matches/${matchId}">here</a>, or from the matches tab.`,
																						isRead: false,
																						user_id: opponentId
																					});
																				} else if (player1Score > player2Score) {
																					let notification1 = models.Notification.create({
																						type: 'SUCCESS'	,
																						title: 'Won Game!',
																						message: `Your won ${player1Score}-${player2Score} to ${user2.name}. View your match <a href="/matches/${matchId}">here</a>, or from the matches tab.`,
																						isRead: false,
																						user_id: userId
																					});
																					let notification2 = models.Notification.create({
																						type: 'INFORMATION',
																						title: 'Lost Game',
																						message: `You lost ${player2Score}-${player1Score} to ${user1.name}. View your match <a href="/matches/${matchId}">here</a>, or from the matches tab.`,
																						isRead: false,
																						user_id: opponentId
																					});
																				} else {
																					let notification1 = models.Notification.create({
																						type: 'INFORMATION'	,
																						title: 'Tied Game',
																						message: `Your tied ${player1Score}-${player2Score} to ${user2.name}. View your match <a href="/matches/${matchId}">here,</a> or from the matches tab.`,
																						isRead: false,
																						user_id: userId
																					});
																					let notification2 = models.Notification.create({
																						type: 'INFORMATION'	,
																						title: 'Tied Game',
																						message: `Your tied ${player1Score}-${player2Score} to ${user1.name}. View your match <a href="/matches/${matchId}">here,</a> or from the matches tab.`,
																						isRead: false,
																						user_id: opponentId
																					});
																				}
																				let notificationsPromise = [];
																				Promise.all(notificationsPromise)
																					.then((values, values2) => {
																						//console.log(values, values2);
																						requestUnderway = false;
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
								////console.log(err, body);
								////console.log(Buffer.from(response.body.dll1Encoded, 'base64'));
							});
					}catch(e){
						console.log(e);
					}
				})
				//api call and pop() when necessary
			}
		})
}, 300);

let processQueue = () => {
	return models.ExecuteQueue.findAll()
		.then(executeQueueElements => {
			let executeQueue = executeQueueElements;
			let priority = 0;
			for(let i=0; i<executeQueue.length; i++){
				if(executeQueue[i].isAi){
					priority = i;
					break;
				}else if(executeQueue[i].userId === executeQueue[i].opponentId){
					priority = i;
					break;
				}
			}
			return executeQueue[priority];
		})
}

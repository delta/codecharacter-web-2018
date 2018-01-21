let executeQueueSize = 100;
let executeQueue = [];
const models = require("../models");
const request = require("request");
let requestUnderway = false;
const secretString = require("../config/serverConfig").cookieKey;
let pushToQueue = (matchId, dll1, dll2, userId) => {
	if(executeQueue.length === executeQueueSize){
		return false;
	}else{
		console.log(userId, 'hey');
		executeQueue.push({
			dll1,
			dll2,
			matchId,
			userId
		});
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
		let userId = executeQueue[0].userId;
		requestUnderway = true;
		request(
			{
				method:'POST',
				url: 'http://localhost:3002/execute',
				json: true,
				body: {...codeToBeExecuted, secretString}
			}, (err, response, body) =>{
				let matchId = response.body.matchId;
				requestUnderway = false;
				executeQueue.shift();
				//console.log(body);
				console.log(matchId);
				if(err) throw err;
				if(!body.success){
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
								message: 'Your or the player\'s code didn\'t execute properly, please try again later!',
								isRead: false,
								user_id: userId
							})
								.then(notification => {
									//idk what to do here
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
					models.Match.update({
							status: 'success',
							log: body.log.data
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
								type: 'SUCCESS'	,
								title: 'Executed successfully!',
								message: 'Your match just successfully got executed!',
								isRead: false,
								user_id: userId
							})
								.then(notification => {
									//idk what to do here
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
				//console.log(err, body);
				//console.log(Buffer.from(response.body.dll1Encoded, 'base64'));
			});
		//api call and pop() when necessary
	}
}, 300);

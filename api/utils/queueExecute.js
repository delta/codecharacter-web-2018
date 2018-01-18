let executeQueueSize = 100;
let executeQueue = [];
const models = require("../models");
const request = require("request");
let requestUnderway = false;
const secretString = require("../config/serverConfig").cookieKey;
let pushToQueue = (matchId, dll1, dll2) => {
	if(executeQueue.length === executeQueueSize){
		return false;
	}else{
		executeQueue.push({
			dll1,
			dll2,
			matchId
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
		requestUnderway = true;
		request(
			{
				method:'POST', 
				url: 'http://localhost:3000/execute',
				json: true,
				body: {...codeToBeExecuted, secretString}
			}, (err, response, body) =>{
				let matchId = body.matchId;
				requestUnderway = false;
				executeQueue.shift();
				//console.log(body);   
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
						})
						.catch(err => {
							throw err;
							console.log(err);
						})
				}else{
					models.Match.update({
							status: 'success',
							log: body.log
						}, 
						{
							where:{
								id: matchId	
							}
						}
					)
						.then(match => {
							console.log(match);
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
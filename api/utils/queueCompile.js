let compileQueueSize = 100;
let compileQueue = [];
const models = require("../models");
const request = require("request");
let requestUnderway = false;
const secretString = require("../config/serverConfig").cookieKey;
const compileBoxUrl = require("../config/serverConfig").compileBoxUrl;
let pushToQueue = (userId, code) => {
	//console.log(compileQueueSize, compileQueue.length, compileQueue);
	if(compileQueue.length === compileQueueSize){
		return false;
	}else{
		compileQueue.push({
			userId,
			code
		});
		return true;
	}
}

/*let popCode = (userId) => {
	compileQueue.map((element, index) => {
		if(element.userId === userId){
			let poppedCode = compileQueue.splice(index, 1);
			return poppedCode;
		}
	});
}*/

let getQueueSize = () => {
	return compileQueue.length;
}
module.exports = {
	compileQueue,
	pushToQueue,
	getQueueSize
};

//write watcher for compileQueue
setInterval(() => {
	if(requestUnderway){
		return; 
	}
	if(getQueueSize()){
		let codeToBeCompiled = compileQueue[0];
		//console.log(codeToBeCompiled);
		requestUnderway = true;
		console.log(compileBoxUrl +'/compile');
		try{
			request(
				{
					method:'POST',
					url: compileBoxUrl + '/compile',
					json: true,
					body: {...codeToBeCompiled, secretString}
				}, (err, response, body) =>{
					if(err) console.log(err);
					requestUnderway = false;
					compileQueue.shift();
					let userId = codeToBeCompiled.userId;
					if(!response){
						models.Notification.create({
								type: 'ERROR'	,
								title: 'Compilation Error',
								message: 'Our server has taken a hit, please stay with us while we fix this!',
								isRead: false,
								user_id: Number(userId)
							})
						console.log("Please start the compilebox!");
						return;
					}
					if(!response.body.success){
						//console.log(response.body);
						return models.Code.update({ 
									error_log: response.body.error,
									status:'error'
								},{
									where:{
										user_id:Number(userId)
									}
								}
							)
								.then(code => {
									//console.log(code);
									//console.log("Compilation Error!");

									models.Notification.create({
										type: 'ERROR'	,
										title: 'Compilation Error',
										message: 'Your code didn\'t compile, please check your code and compile again!',
										isRead: false,
										user_id: Number(userId)
									})
										.then(notification => {
											//idk what to do here
										})
										.catch(err => {
											//console.log(err);
										})
								})
								.catch(err => {
									//console.log(err);
								})
					}
					models.Code.update({
							dll1: response.body.dll1.data,
							dll2: response.body.dll2.data,
							error_log:'',
							status:'success'
						},{
							where:{
								user_id:Number(userId)
							}
						}
					)
						.then(code => {
							//console.log(code);
							//console.log("successfully compiled!");
							/*
								models.Notification.create({
									type: 'SUCCESS'	,
									title: 'Compiled successfully!',
									message: 'Your code just compiled.',
									isRead: false,
									user_id: Number(userId)
								})
									.then(notification => {
										//idk what to do here
									})
									.catch(err => {
										//console.log(err);
									})
							*/
						})
						.catch(err => {
							//console.log(err);
						})

				});
		}catch(e){
			console.log(e);
			//for now it doesn't care about the queue, code to be pushed for that by today afternoon
		}
		//api call and pop() when necessary
	}
}, 300);

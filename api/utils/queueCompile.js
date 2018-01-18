let compileQueueSize = 100;
let compileQueue = [];
const models = require("../models");
const request = require("request");
let requestUnderway = false;
const secretString = require("../config/serverConfig").cookieKey;
let pushToQueue = (userId, code) => {
	console.log(compileQueueSize, compileQueue.length, compileQueue);
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
		console.log(codeToBeCompiled);
		requestUnderway = true;
		request(
			{
				method:'POST', 
				url: 'http://localhost:3000/compile',
				json: true,
				body: {...codeToBeCompiled, secretString}
			}, (err, response, body) =>{
				requestUnderway = false;
				compileQueue.shift();
				let userId = response.headers['user_id'];
				//console.log(err, body);
				//console.log(Buffer.from(response.body.dll1Encoded, 'base64'));
				if(!response.body.success){
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
								console.log(code);
								console.log("Compilation Error!"); 
							})
							.catch(err => {
								console.log(err);
							})
				}
				models.Code.update({
						dll1: response.body.dll1Encoded,
						dll2: response.body.dll2Encoded,
						error_log:'',
						status:'success'
					},{
						where:{
							user_id:Number(userId) 
						}
					}
				)
					.then(code => {
						console.log(code);
						console.log("successfully compiled!"); 
					})
					.catch(err => {
						console.log(err);
					})

			});
		//api call and pop() when necessary
	}
}, 300);
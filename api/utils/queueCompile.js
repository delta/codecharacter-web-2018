let compileQueueSize = 1;
let compileQueue = [];
const models = require("../models");
const request = require("request");

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
	if(getQueueSize()){
		let codeToBeCompiled = compileQueue[0];
		console.log(codeToBeCompiled);
		request
			.post({
				url: 'http://localhost:3000/compile',
				json: true,
				body: {...codeToBeCompiled, secretString}
			})
			.on('response', (response) => {
				let codeDetails = compileQueue.shift();
						console.log(response.headers); 
				models.Code.update({
					status:'success',
					dll1: response.body
				},
				{
					where:{
						user_id: Number(response.headers['user_id'])
					}
				})
					.then((code) => {
						//do something
						return; 
					})
					.catch((err) => {
						console.log(err);
					});
			})   
			.on('error', (err) => {
				console.log(err);
			})
		//api call and pop() when necessary
	}
}, 300);
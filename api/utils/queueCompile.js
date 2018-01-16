let compileQueueSize = 100;
let compileQueue = [];
let buffer = [];

const request = require("request");
let pushToQueue = (userId, code) => {
	if(compileQueue.size === compileQueueSize){
		buffer.push({
			userId,
			code
		});
	}else{
		compileQueue.push({
			userId,
			code
		});
	}
	return;
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
				url: 'http://localhost:3000/dll',
				json: true,
				body: codeToBeCompiled
			})
			.on('response', (response) => {
				compileQueue.shift();
				if(buffer.length){
					compileQueue.push(buffer.shift())
				}
				console.log(response.headers); 
			})   
			.on('error', (err) => {
				console.log(err);
			})
		//api call and pop() when necessary
	}
}, 300);
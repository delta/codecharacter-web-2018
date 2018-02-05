let compileQueue = [];
const models = require("../models");
const request = require("request");
let compileQueueSize;
models.Constant.findOne({
	where: {
		key: 'MAX_QUEUED_COMPILATIONS'
	}
})
	.then(constant => {
		compileQueueSize = constant.value;
		if(!constant){
			compileQueueSize = 100;
		}
	})
	.catch(err => {
		compileQueueSize = 100;
	})
let requestUnderway = false;
const secretString = require("../config/serverConfig").cookieKey;
const compileBoxUrl = require("../config/serverConfig").compileBoxUrl;
let pushToQueue = (userId, code) => {
	//console.log(compileQueueSize, compileQueue.length, compileQueue);
	return getQueueSize()
		.then(queueLength => {
			console.log(queueLength);
			if(queueLength === compileQueueSize){
				return Promise.resolve(false);
			}else{
				let success;
				let promise = models.CompileQueue.create({
					user_id: userId,
					code,
					createdAt: new Date(),
					updatedAt: new Date()
				})
					.then(compileQueueElement => {
						// do something
					})
					.catch(err => {
						console.log(err);
					})
				return true;
			}

		});

	/*
		if(compileQueue.length === compileQueueSize){
			return false;
		}else{
			compileQueue.push({
				userId,
				code
			});
			return true;
		}
	*/
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
	return models.CompileQueue.findAll({
		attributes: ['id']
	})
		.then(compileQueueElements => {
			return compileQueueElements.length;
		})
		.catch(err => {
			console.log(err);
		})
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
	getQueueSize().then(queueSize => {
		if(queueSize){
			models.CompileQueue.find()
				.then(compileQueueElement => {
					if(!compileQueueElement){
						return;
					}
					let codeToBeCompiled = compileQueueElement.dataValues;
					requestUnderway = true;
					try{
						request(
							{
								method:'POST',
								url: compileBoxUrl + '/compile',
								json: true,
								body: {...codeToBeCompiled, secretString}
							}, (err, response, body) =>{
								requestUnderway = false;
								if(err) console.log(err);
								if(!response){
									console.log('Please connect compilebox');
									return;
								}
								if(!response.body){
									console.log('Please fix compilebox');
									return;	
								}
								let userId = codeToBeCompiled.user_id;
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

												models.CompileQueue.destroy({
													where: {
														id: codeToBeCompiled.id
													}
												})
													.then(alpha => {
														console.log(alpha);
													})
													.catch(err => {
														console.log(err);
													})
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
														console.log(err);
													})
											})
											.catch(err => {
												console.log(err);
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
										models.CompileQueue.destroy({
											where: {
												id: codeToBeCompiled.id
											}
										})
											.then(alpha => {
												console.log(alpha);
											})
											.catch(err => {
												console.log(err);
											})
									})
									.catch(err => {
										//console.log(err);
									})

							});
					}catch(e){
						console.log(e);
					}
				})
				.catch(err => {
					console.log(err);
				})
		}
	})
	.catch(err => {
		console.log(err);
	})
	
}, 300);

module.exports.authenticate = (req, res, next) => {
	if (req.session.isLoggedIn) {
		next();
	} else {
		console.log(req.session);
		res.json({ "status": 200, "success": false, "redirect": "/login", });
	}
};

 

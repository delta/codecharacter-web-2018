module.exports.authenticate = (req, res, next) => {
	if (req.session.isLoggedIn) {
		next();
	} else {
		res.json({ "status": 200, "success": false, "redirect": "/login", });
	}
};

 

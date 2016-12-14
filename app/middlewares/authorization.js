var jwt = require('jsonwebtoken');



function authorize_user(req, res, next){
	var token = req.headers['x-access-token'];
	if (token) {

		jwt.verify(token, "super_secrete_need_to_be_changed", function(err, decodedToken){
			if (err) {
				return res.json({
					success: false,
					message: "Authorization failed!"
				})
			}
			else
			{
				req.decodedToken = decodedToken;
				req.current_user = decodedToken._doc
				next();
			}
		});
	}
	else
	{
		return res.status(403).send({
			success: false,
			message: "No token Provided"
		})
	}
}

module.exports = authorize_user;
var jwt = require('jsonwebtoken');
var User = require('../../models/user').db;

function autheticateUser(req, res) {
	var username = req.body.username;
	var password = req.body.password;

	User.findOne({
		username: username
	},function (err, user) {
		if (err) { throw err}

		if (!user) {
			res.json({
				success: false,
				message: "Authentication failed, user not found"
			});
		}
		if (user.password != password) {
			res.json({
				success: false,
				message: "Authentication failed, Wrong password"
			});
		}
		else
		{
			// TODO
			var token = jwt.sign(user, "super_secrete_need_to_be_changed");

			res.json({
				success: true,
				message: "Authentication Successfull..",
				token: token
			});	
		}
	});
}


var bind_auth_api = function(router) {
	router.route("/auth").post(autheticateUser);

}

module.exports = { bind: bind_auth_api };

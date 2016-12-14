var User = require('../../models/user')
var authorize = require("../../middlewares/authorization");


function getAllUsers(req, res) {
	User.getAll(function (users) {
		res.json({
			users: users
		})
	});
}


function createUser(req, res) {
	var newUser = {	
		username : req.body.username,
		email: req.body.email,
	 	password :req.body.password
	};

	User.create(newUser, function (err, user) {
		res.json({
			message: "Successfully created",
			user: user
		});
	});
}

function deleteUser(req, res) {
	var id = req.params.id;
	User.delete(id,function(err) {
		if (err) {throw err}
		res.json({
			message: "Successfully deleted"
		})
	})

}



var bind_user_controller = function(router){
	router.route("/users").get(authorize, getAllUsers).post(createUser);
	router.route("/users/:id").delete(deleteUser);
}


module.exports = {
	bind: bind_user_controller
}





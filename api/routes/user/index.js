var User = require('../../models/user')
var auth = require('../../middlewares/authorization');
var Board = require('../../models/board')
var Pin = require('../../models/pin')

function getAllUsers(req, res) {
    User.getAll(function(users) {
        res.json({users: users})
    });
}

function createUser(req, res) {
    var newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    User.create(newUser, function(err, user) {
        res.json({message: "Successfully created", user: user});
    });
}

function deleteUser(req, res) {
    var id = req.params.id;
    User.delete(id, function(err) {
        if (err) {
            throw err
        }
        res.json({message: "Successfully deleted"})
    });
}

function addNewBoard(req, res) {
    var board = req.params.newboard;
    Board.findOne({
        title: board
    }, function(err, b) {
        User.findOne({
            _id: auth.getCurrentUser()._id
        }, function(err, user) {
            Pin.findOne({
                _id: "5852d3f7377ba894f185f30d"
            }, function(err, pin) {
                user.addBoard(b, pin, function(err) {
                    if (err) {
                        throw err
                    }
                    res.json({success: true, message: "Board added Successfully"});
                });
            });
        })

    });

}

var bind_user_controller = function(router) {
    router.route("/users").post(createUser);
    router.route("/users/:id").delete(auth.authorize_user, deleteUser);
    router.route("/users/newboard/:newboard").get(auth.authorize_user, addNewBoard);
}

module.exports = {
    bind: bind_user_controller
}

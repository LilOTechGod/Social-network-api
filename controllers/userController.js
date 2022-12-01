const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    getUser(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // Get a single user
    getSingleUser(req, res) {
        User.findOne({ id: req.params.userId })
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Create a user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({ id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No User with that ID' })
                    : Thought.deleteMany({ username: {$in: user.username}})
            )
            .then((confirm) => res.json({ message: 'User deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    //update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // add a new friend to a user's friend list
    addFriend(req, res) {
        User.findOneAndUpdate({ id: req.params.userId }, { $push: { friends: req.params.friendId } }, { new: true })
            .then((newFriend) => res.status(200).json(newFriend))
            .catch((err) => res.status(500).json(err))
    },
    // remove a friend from a user's friend list
    deleteFriend(req, res) {
        User.findOneAndDelete({id: req.params.userId}, {$pull: {friends: req.params.friendId}}, {new: true})
            .then((oldFriend) => res.status(200).json(oldFriend))
            .catch((err) => res.status(500).json(err));
    }
};
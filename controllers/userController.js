const { User } = require("../models");

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // get user by id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate({ path: "friends", select: "-__v" })
      .populate({ path: "thoughts", select: "-__v" })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // create new user
  postUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .then(() => res.json({ message: "User created!" }))
      .catch((err) => res.status(500).json(err));
  },

  // update user by id
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, body, {
      new: true,
      runValidators: true,
    })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // delete user by id
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // add a friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true }
    )
      .select("-__v")
      .populate({ path: "friends", select: "-__v" })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // delete friend
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .select("-__v")
      .populate({ path: "friends", select: "-__v" })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};

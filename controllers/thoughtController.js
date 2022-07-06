const { Thought } = require("../models");

module.exports = {
  // Get all users
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // get thought by id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate({ path: "reactions", select: "-__v" })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // create a new thought
  postThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .then(() => res.json({ message: "thought created!" }))
      .catch((err) => res.status(500).json(err));
  },

  // update thought by id
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.userId }, body, {
      new: true,
      runValidators: true,
    })
      .select("-__v")
      .populate({ path: "reactions", select: "-__v" })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // delete thought by id
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.userId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // add a new reaction
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true, runValidators: true }
    )
      .select("-__v")
      .populate({ path: "reactions", select: "-__v" })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // delete reaction
  deleteReaction(req, res) {
    Thought.findOneAndDelete(
      { _id: req.params.userId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};

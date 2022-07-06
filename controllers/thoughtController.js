const { Thought } = require("../models");

module.exports = {
  // Get all users
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.userId })
      .select("-__v")
      //   .populate("friends")
      //   .populate("thoughts")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  postThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .then(() => res.json({ message: "thought created!" }))
      .catch((err) => res.status(500).json(err));
  },
};

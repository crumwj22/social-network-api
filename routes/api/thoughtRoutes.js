const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  postThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/ThoughtController.js");

// /api/Thoughts
router.route("/").get(getThoughts).post(postThought);

// /api/Thoughts/:ThoughtId
router
  .route("/:ThoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:thoughtId/reactions").post(addReaction).delete(deleteReaction);

module.exports = router;

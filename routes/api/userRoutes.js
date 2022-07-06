const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  postUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController.js");

// /api/Users
router.route("/").get(getUsers).post(postUser);

// /api/users/:UserId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// Add and delete a friend
router.route("/:id/friends/:friendsId").post(addFriend).delete(removeFriend);

module.exports = router;

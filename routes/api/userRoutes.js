const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  postUser,
  // updateUser,
  // deleteUser,
} = require("../../controllers/userController.js");

// /api/Users
router.route("/").get(getUsers).post(postUser);

// /api/users/:UserId
router.route("/:userId").get(getSingleUser);
// .put(updateUser).delete(deleteUser);

module.exports = router;

const { Schema, model } = require("mongoose");

// Schema to create User model
const userSchema = new Schema(
  {
    userName: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // Regex to validate email
      match: [/.+\@.+\..+/, "invalid email address"],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});
const User = model("user", userSchema);

module.exports = User;

const mongoose = require("mongoose");
const User=require("../models/user")
const Post = require("../models/post");

const { ObjectId } = mongoose.Schema;

const reactSchema = new mongoose.Schema({
  react: {
    type: String,
    enum: ["like", "love", "haha", "sad", "angry", "wow"],
    required: true,
  },
  reactBy: {
    type: ObjectId,
    ref: User,
  },
  postRef: {
    type: ObjectId,
    ref: Post,
  },
});

module.exports = mongoose.model("react", reactSchema);

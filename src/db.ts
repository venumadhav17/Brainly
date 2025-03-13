// import mongoose from "mongoose";
import mongoose, { model, Schema } from "mongoose";

mongoose.connect(
  "mongodb+srv://kalyanamvenumadhav:Venu71V@cluster0.hfc0h.mongodb.net/brainly"
);

const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String
});

export const UserModel = model("User", userSchema);

const tagSchema = new Schema({
  title: { type: String, required: true, unique: true }
});

export const TagModel = model("Tag", tagSchema);

const contentSchema = new Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  type: { type: String, enum: ["image", "video", "article", "audio"] },
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true }
});

export const ContentModel = model("Content", contentSchema);

const linkSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

export const linkModel = model("link", linkSchema);
/*const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30
  }
});

const tagSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  }
});

const contentTypes = ["image", "video", "article", "audio"];

const contentSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: contentTypes
  },
  title: {
    type: String,
    required: true
  },
  tags: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tag"
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

const linkSchema = new mongoose.Schema({
  hash: {
    type: String,
    unique: true,
    password: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

export const User = mongoose.model("User", userSchema);
const Tag = mongoose.model("Tag", tagSchema);
const Content = mongoose.model("Content", contentSchema);
const Link = mongoose.model("Link", linkSchema);*/

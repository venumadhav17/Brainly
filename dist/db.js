"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentModel = exports.UserModel = void 0;
// import mongoose from "mongoose";
const mongoose_1 = __importStar(require("mongoose"));
mongoose_1.default.connect("mongodb+srv://kalyanamvenumadhav:Venu71V@cluster0.hfc0h.mongodb.net/brainly");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String
});
exports.UserModel = (0, mongoose_1.model)("User", userSchema);
const contentSchema = new mongoose_1.Schema({
    title: String,
    link: String,
    tags: [{ type: mongoose_1.default.Types.ObjectId, ref: "Tag" }],
    userId: { type: mongoose_1.default.Types.ObjectId, ref: "User", required: true }
});
exports.ContentModel = (0, mongoose_1.model)("Content", contentSchema);
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

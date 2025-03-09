import express from "express";

import mongoose from "mongoose";

import jwt from "jsonwebtoken";

import { z } from "zod";
import { ContentModel, UserModel } from "./db";

import { JWT_PASSWORD } from "./config";
import { userMiddleware } from "./middleware";

const app = express();
app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
  // zod validation, hash the password, user exists
  /*const userSchema = z.object({
    name: z.string().min(3),
    password: z.string().min(8)
  });*/

  const username = req.body.username;
  const password = req.body.password;

  try {
    await UserModel.create({
      username: username,
      password: password
    });

    res.json({
      message: "User signed up"
    });
  } catch (e) {
    res.status(411).json({
      message: "User already exists"
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const exisitingUser = await UserModel.findOne({
    username,
    password
  });

  if (exisitingUser) {
    const token = jwt.sign(
      {
        id: exisitingUser._id
      },
      JWT_PASSWORD
    );

    res.json({
      token
    });
  } else {
    res.status(403).json({
      message: "Incorrect Credentials"
    });
  }
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
  const link = req.body.link;
  const type = req.body.type;

  await ContentModel.create({
    link,
    type,
    //@ts-ignore
    userId: req.userId,
    tags: []
  });

  res.json({
    message: "Content added"
  });
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId;
  const content = await ContentModel.find({
    userId: userId
  });
  res.json({
    content
  });
});

app.post("/api/v1/brain/share", (req, res) => {});

app.get("/api/v1/brain/:shareLink", (req, res) => {});

app.listen(3000);

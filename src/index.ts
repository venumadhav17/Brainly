import jwt from "jsonwebtoken";
import express from "express";
import { UserModel, TagModel, ContentModel } from "./db";
import { JWT_PASSWORD } from "./config";
import { userMiddleware } from "./middleware";
import { Request, Response } from "express";

const app = express();
app.use(express.json());

interface AuthRequest extends Request {
  userId?: String;
}

app.post("/signup", async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  await UserModel.create({
    username,
    password
  });
  res.json({
    message: "User Created"
  });
});

app.post("/signin", async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });

  if (user) {
    const token = await jwt.sign(
      {
        _id: user._id
      },
      JWT_PASSWORD
    );
    res.status(200).json({ token: token });
  } else {
    res.status(404).json({
      message: "User not found"
    });
  }
});

app.post("/tag", async (req, res) => {
  const tagName = req.body.title;
  console.log(tagName);
  const newTag = await TagModel.create({
    title: tagName
  });
  res.status(201).json({
    msg: "Tag created",
    tag: newTag
  });
});

app.post(
  "/content",
  userMiddleware,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { title, type, link, tags } = req.body;
      const userId = req.userId;

      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const content = await ContentModel.create({
        title,
        type,
        link,
        tags,
        userId
      });
      const populatedContent = await ContentModel.findById(
        content._id
      ).populate("tags", "title -_id");

      res.status(200).json({
        msg: "Content Created",
        content: populatedContent
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(403).json({ msg: error.message });
        return;
      } else
        res.status(500).json({
          message: "Internal Server Error"
        });
      return;
    }
  }
);

app.get("/posts", userMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req;
    const content = await ContentModel.find({ userId })
      .populate("userId", "username")
      .populate("tags");
    res.json({
      content
    });
  } catch (e) {
    if (e instanceof Error) {
      res.status(403).json({ msg: e.message });
      return;
    } else {
      res.status(500).json({ msg: "Internal Server Error" });
      return;
    }
  }
});

app.listen(3000);

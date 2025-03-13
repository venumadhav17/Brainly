"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    yield db_1.UserModel.create({
        username,
        password
    });
    res.json({
        message: "User Created"
    });
}));
app.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield db_1.UserModel.findOne({ username });
    if (user) {
        const token = yield jsonwebtoken_1.default.sign({
            _id: user._id
        }, config_1.JWT_PASSWORD);
        res.status(200).json({ token: token });
    }
    else {
        res.status(404).json({
            message: "User not found"
        });
    }
}));
app.post("/tag", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tagName = req.body.title;
    console.log(tagName);
    const newTag = yield db_1.TagModel.create({
        title: tagName
    });
    res.status(201).json({
        msg: "Tag created",
        tag: newTag
    });
}));
app.post("/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, type, link, tags } = req.body;
        const userId = req.userId;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const content = yield db_1.ContentModel.create({
            title,
            type,
            link,
            tags,
            userId
        });
        const populatedContent = yield db_1.ContentModel.findById(content._id).populate("tags", "title -_id");
        res.status(200).json({
            msg: "Content Created",
            content: populatedContent
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(403).json({ msg: error.message });
            return;
        }
        else
            res.status(500).json({
                message: "Internal Server Error"
            });
        return;
    }
}));
app.get("/posts", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req;
        const content = yield db_1.ContentModel.find({ userId })
            .populate("userId", "username")
            .populate("tags");
        res.json({
            content
        });
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(403).json({ msg: e.message });
            return;
        }
        else {
            res.status(500).json({ msg: "Internal Server Error" });
            return;
        }
    }
}));
app.listen(3000);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const Message_1 = __importDefault(require("../model/Message"));
exports.sendMessage = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const message = await Message_1.default.create({
        text: req.body.text,
    });
    console.log(req.user);
    console.log(message);
    res.status(200).json({
        status: 'success',
        data: message,
    });
});

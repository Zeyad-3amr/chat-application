"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomCheck = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const appError_1 = require("../utils/appError");
const Room_1 = __importDefault(require("../model/Room"));
const User_1 = __importDefault(require("../model/User"));
exports.roomCheck = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    var _a, _b;
    let room;
    let statusCode = 200;
    const receiver = await User_1.default.findOne({ userName: req.params.userName });
    if (!receiver) {
        return next(new appError_1.AppError('No user Found with this id', 404));
    }
    room = await Room_1.default.findOne({
        users: { $size: 2, $all: [(_a = req.user) === null || _a === void 0 ? void 0 : _a.id, receiver === null || receiver === void 0 ? void 0 : receiver.id] },
    }).populate({
        path: 'users',
    });
    if (!room) {
        room = await Room_1.default.create({
            users: [(_b = req.user) === null || _b === void 0 ? void 0 : _b.id, receiver === null || receiver === void 0 ? void 0 : receiver.id],
        });
        room = await room.populate({
            path: 'users',
        });
        statusCode = 201;
    }
    res.status(statusCode).json({
        status: 'success',
        room,
    });
});

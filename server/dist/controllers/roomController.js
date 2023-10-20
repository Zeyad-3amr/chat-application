"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomCheck = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const Room_1 = __importDefault(require("../model/Room"));
exports.roomCheck = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    var _a, _b, _c;
    let room;
    let statusCode = 200;
    room = await Room_1.default.findOne({
        users: { $size: 2, $all: [(_a = req.user) === null || _a === void 0 ? void 0 : _a.id, req.params.id] },
    }).populate({
        path: 'users',
    });
    if (!room) {
        room = await Room_1.default.create({
            users: [(_b = req.user) === null || _b === void 0 ? void 0 : _b.id, (_c = req.params) === null || _c === void 0 ? void 0 : _c.id],
        });
        room = await room.populate({
            path: 'users',
        });
        room = await room.populate({
            path: 'messages',
            populate: [
                {
                    path: 'from',
                },
                {
                    path: 'to',
                },
            ],
        });
        statusCode = 201;
    }
    res.status(statusCode).json({
        status: 'success',
        room,
    });
});

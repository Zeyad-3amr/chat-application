"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const User_1 = __importDefault(require("../model/User"));
exports.signup = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const newUser = await User_1.default.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
    });
    console.log(newUser);
    res.status(201).json({
        status: 'success',
        data: newUser,
    });
});

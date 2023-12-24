"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const messageController_1 = require("../controllers/messageController");
const userController_1 = require("../controllers/userController");
exports.router = express_1.default.Router();
exports.router.route('/sendMessage').post(userController_1.protect, messageController_1.sendMessage);

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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const http = __importStar(require("http"));
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const socketio = __importStar(require("socket.io"));
const Room_1 = __importDefault(require("./model/Room"));
const port = 8000;
dotenv_1.default.config();
const mongoDB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
const server = http.createServer(app_1.default);
mongoose_1.default.connect(mongoDB).then(() => console.log('DB connection successfull !'));
const io = new socketio.Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});
let users = new Set();
io.on('connection', (socket) => {
    socket.on('join_room', (data) => {
        socket.join(data);
    });
    socket.on('online', async (data) => {
        users.add(data);
        io.emit('online_users', [...users]);
    });
    socket.on('logout', async (data) => {
        users.delete(data);
        io.emit('offline', [...users]);
    });
    socket.on('send_message', async (data) => {
        socket.to(data.roomId).emit('receive_message', data);
        console.log(data);
        await Room_1.default.findByIdAndUpdate(data.roomId, {
            $push: {
                messages: {
                    text: data.text,
                    from: data.from,
                    to: data.to,
                    createdAt: data.createdAt,
                },
            },
        });
    });
});
server.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

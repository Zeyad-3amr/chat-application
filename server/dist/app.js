"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const userRoutes_1 = require("./routes/userRoutes");
// import bodyParser from 'body-parser';
const app = (0, express_1.default)();
app.enable('trust proxy');
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.options('*', (0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use('/api/chat-application/user', userRoutes_1.router);
app.get('/', (req, res) => {
    res.send('Homes');
});
exports.default = app;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const socketio_1 = require("./socketio");
dotenv_1.default.config();
const port = process.env.PORT;
const app = (0, express_1.default)();
app.use(cors_1.default);
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
(0, socketio_1.socketio)(io);
// connect to database
// connectDB();
// mongoose.connection.once("open", () => {
//   server.listen(port, () => {
//     console.log("🔗 Successfully Connected to MongoDB");
//     console.log(`✅ Application running on port: ${port}`);
//   });
// });
// mongoose.connection.on("error", (err) => {
//   console.log(err);
// });
// app.get('/', (req: Request, res: Response) => {
//   res.send('Express + TypeScript Server');
// });
server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

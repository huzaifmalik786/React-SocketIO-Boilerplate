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
exports.socketio = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const validUsername = process.env.USER;
const validPassword = process.env.PASSWORD;
function socketio(io) {
    io.on("connection", (socket) => {
        socket.auth = false;
        socket.on("authenticate", (auth) => __awaiter(this, void 0, void 0, function* () {
            const { username, password } = auth;
            // Find user
            // const user = await User.findOne({ username }).exec();
            if (username !== validUsername) {
                socket.emit("error", { message: "No user found" });
            }
            else if (password !== validPassword) {
                socket.emit("error", { message: "Wrong password" });
            }
            else {
                socket.auth = true;
            }
        }));
        setTimeout(() => {
            // If the authentication failed, disconnect socket
            if (!socket.auth) {
                console.log("Unauthorized: Disconnecting socket ", socket.id);
                return socket.disconnect("unauthorized");
            }
            return socket.emit("authorized");
        }, 1000);
        console.log("🔥 Socket connected: ");
        socket.on("getUser", () => {
            socket.emit("user", {
                username: validUsername,
            });
        });
        socket.on("disconnect", () => {
            socket.disconnect("disconnect");
        });
    });
}
exports.socketio = socketio;

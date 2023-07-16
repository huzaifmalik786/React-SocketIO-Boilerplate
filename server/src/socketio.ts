import { User } from "./models/user";
import dotenv from 'dotenv';

dotenv.config();
const validUsername = process.env.USER;
const validPassword = process.env.PASSWORD;

export function socketio(io: any) {
  
    io.on("connection", (socket: any) => {
        socket.auth = false;

        socket.on("authenticate", async (auth: any) => {
            const { username, password } = auth;

            // Find user
            // const user = await User.findOne({ username }).exec();

            if (username !== validUsername) {
                socket.emit("error", { message: "No user found" });
            } else if (password !== validPassword) {
                socket.emit("error", { message: "Wrong password" });
            } else {
                socket.auth = true;
            }
        });
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
    })

}